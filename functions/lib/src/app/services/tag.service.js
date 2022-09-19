"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let TagService = class TagService {
    constructor(db, authService) {
        this.db = db;
        this.authService = authService;
        this.tagsCollection = this.db.collection('tags', ref => ref.orderBy('createdAt', 'desc'));
        this.tagsRecommendations = this.db.collection('tagsRecommends', ref => ref.orderBy('createdAt', 'desc'));
        this.tagSource = new rxjs_1.BehaviorSubject('default');
        this.currentTag = this.tagSource.asObservable();
    }
    getMeta() {
        return this.db.doc('metas/tag').valueChanges();
    }
    setCurrentTag(tagId) {
        this.tagSource.next(tagId);
    }
    getAllTags() {
        return this.db.collection('tags', ref => ref.orderBy('totalUsed', 'desc')).valueChanges();
    }
    getAllTagRecommends() {
        return this.db.collection('tagsRecommends', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
    }
    getPopularTags() {
        return this.db.collection('tags', ref => ref.orderBy('totalUsed', 'desc').limit(8)).valueChanges();
    }
    async getUserTags(user) {
        const userData = await this.db.collection('users').doc(user.uid).ref.get();
        const promises = [];
        const tagsRef = this.db.collection('tags', ref => ref.orderBy('updatedAt', 'desc'));
        for (const p in userData.data().tags) {
            if (userData.data().tags[p]) {
                promises.push(tagsRef.doc(p).ref.get());
            }
        }
        return await Promise.all(promises);
    }
    getTagInfo(id) {
        return this.tagsCollection.doc(id).valueChanges();
    }
    createTag(formData, user) {
        const data = {
            name: formData.name,
            createdBy: {
                displayName: user.displayName,
                uid: user.uid
            },
            description: formData.description,
            createdAt: new Date(),
            updatedAt: new Date(),
            totalUsed: 0,
            active: false
        };
        return this.tagsCollection.add(data).then(res => {
            return res.update({
                id: res.id
            });
        });
    }
    recommendTag(formData, user) {
        const data = {
            name: formData.name,
            recommendBy: {
                displayName: user.displayName,
                uid: user.uid
            },
            description: formData.description,
            createdAt: new Date(),
            status: false
        };
        return this.tagsRecommendations.add(data)
            .then(res => {
            return res.update({
                id: res.id
            });
        });
    }
    commitRecommend(tag) {
        return this.tagsRecommendations.doc(tag.id).set({
            status: true,
            updatedAt: new Date()
        }, { merge: true });
    }
    updateTag(formData, oldData) {
        return this.tagsCollection.doc(oldData.id).set({
            name: formData.name,
            description: formData.description,
            updatedAt: new Date(),
        }, { merge: true });
    }
    followTag(user, tag) {
        return this.findFollower(user, tag)
            .subscribe(followers => {
            if (followers.size < 1) {
                return this.tagsCollection.doc(tag.id).collection('followers').add({ uid: user.uid });
            }
        });
    }
    unfollowTag(user, tag) {
        return this.findFollower(user, tag)
            .subscribe(followers => {
            if (followers.size > 0) {
                followers.forEach(item => {
                    return this.tagsCollection.doc(tag.id).collection('followers').doc(item.id).delete();
                });
            }
        });
    }
    getFollowers(tag) {
        return this.tagsCollection.doc(tag.id).collection('followers').valueChanges();
    }
    getFollowersAsPromise(tag) {
        return this.tagsCollection.doc(tag.id).collection('followers').ref.get();
    }
    async getMultipleTagsFollowers(tags) {
        const promises = [];
        const followers = [];
        for (const tag of tags) {
            promises.push(this.getFollowersAsPromise(tag));
        }
        const allFollowers = await Promise.all(promises);
        for (const follower of allFollowers) {
            follower.forEach(doc => {
                if (!(!!followers.find(t => t.uid === doc.data().uid))) {
                    followers.push(doc.data());
                }
            });
        }
        return followers;
    }
    createTagCategory(categoryObj) {
        const data = {
            name: categoryObj.name,
            description: categoryObj.description,
            image: categoryObj.image,
            tags: categoryObj.tags,
            color: categoryObj.color
        };
        return this.db.collection('tagCategories').add(data)
            .then(res => {
            return res.update({
                id: res.id
            });
        });
    }
    updateTagCategory(formData, oldData) {
        return this.db.collection('tagCategories').doc(oldData.id)
            .set({
            id: oldData.id,
            name: formData.name,
            description: formData.description,
            tags: formData.tags,
            color: (formData.color) ? formData.color : oldData.color,
            image: (formData.image) ? formData.image : oldData.image
        }, { merge: true });
    }
    getAllTagCategories() {
        return this.db.collection('tagCategories').valueChanges();
    }
    followCategoryTags(categories, user) {
        // 1. Add user.tags -> tag.id = true,
        // 2. Tags.followes + = user.uid = true
        const obj = {};
        const tagsArray = [];
        for (const item of categories) {
            for (const tag of item.tags) {
                obj[tag.id] = true;
                if (!tagsArray.includes(tag.id)) {
                    tagsArray.push(tag.id);
                }
            }
        }
        return this.authService.updateUserInstant({ tags: obj }, user.uid)
            .then(() => {
            const promiseArray = [];
            for (const tag of tagsArray) {
                promiseArray.push(this.followTag(user, { id: tag }));
            }
            return Promise.all(promiseArray);
        });
    }
    findFollower(user, tag) {
        return this.tagsCollection.doc(tag.id).collection('followers', ref => ref.where('uid', '==', user.uid)).get();
    }
};
TagService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map