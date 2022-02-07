import { Component, OnInit } from '@angular/core';
import { ErrorResponse } from 'src/app/models/shared.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';

export interface Tag {
  id: number,
  name: string;
  imagePath: string;
  checked: boolean;
}

@Component({
  selector: 'app-tags-popup',
  templateUrl: './tags-popup.component.html',
  styleUrls: ['./tags-popup.component.scss']
})
export class TagsPopupComponent implements OnInit {
  tags: Array<Tag>;

  tagsSelected: Array<number> = [];

  AlertOpened = false;

  constructor(private _activeModal: NgbActiveModal, private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getTags().subscribe((r) => {
      let responseTags = JSON.parse(JSON.stringify(r));
      responseTags.forEach(element => {
        element.checked = false;
      });
      this.tags = responseTags;
      this.drawUserTags();
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  drawUserTags() {
    this._authService.GetUserTags().subscribe((r) => {
      let responseUserTags = JSON.parse(JSON.stringify(r)).tags;

      this.tags.forEach(e => {
        responseUserTags.forEach(tagId => {
          if (e.id === tagId)
            e.checked = true;
        })
      })
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

  Close(): void {
    this._activeModal.dismiss('Dismiss');
  }

  onChange(tag) {
    let index = this.tags.indexOf(tag);
    this.tags[index].checked = !this.tags[index].checked;
  }

  onSubmit() {
    this.tagsSelected = [];
    this.tags.forEach(e => {
      if (e.checked === true)
        this.tagsSelected.push(e.id);
    })
    this._authService.AddUserTags(this.tagsSelected).subscribe((r) => {
      console.log(r);
      this.AlertOpened = true;
      //setTimeout(() => this.AlertOpened = false, 5000);
    }, error => {
      let dataError: ErrorResponse = error.error;
      console.log(dataError);
    })
  }

}
