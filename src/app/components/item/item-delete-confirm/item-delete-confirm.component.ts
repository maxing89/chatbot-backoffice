import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-item-delete-confirm',
  templateUrl: './item-delete-confirm.component.html',
  styleUrls: ['./item-delete-confirm.component.scss']
})
export class ItemDeleteConfirmComponent implements OnInit {
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(PopoverDirective) confirmPopover: PopoverDirective;

  constructor() { }

  ngOnInit() {
  }

  hideConfirm() {
    this.confirmPopover.hide();
  }

  showConfirm() {
    this.confirmPopover.show();
  }

  acceptConfirm() {
    this.onConfirm.emit();
  }

}
