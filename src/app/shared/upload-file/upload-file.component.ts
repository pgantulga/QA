import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  @Input() path: any;
  @Output() fileEmitter = new EventEmitter<string>();
  snapshot: Observable<any>;
  percentage: Observable<any>;
  fileToUpload: File = null;
  task: AngularFireUploadTask;

  constructor(private storage: AngularFireStorage) { }

  onFileSelected(files) {
    this.fileToUpload = files.item(0);
  }
  upload() {
    const path = this.path;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.fileToUpload);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        const file = await ref.getDownloadURL().toPromise();
        this.fileEmitter.emit(file);
      })
    );
  }
}
