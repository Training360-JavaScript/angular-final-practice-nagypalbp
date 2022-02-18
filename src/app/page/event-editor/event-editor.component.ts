import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  eventId: number = 0;
  eventForUpdate: Event = new Event();

  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params=> {
      this.eventId = params['id'];
      return this.eventService.get(this.eventId);
     }
    ),
  );

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm): void {
    console.log(this.eventId);
    console.log(form);
    this.eventForUpdate.id = this.eventId;
    this.eventForUpdate.name = form.value.name;
    this.eventForUpdate.date = form.value.date;
    this.eventForUpdate.time = form.value.time;
    this.eventForUpdate.location = form.value.location;
    this.eventService.update(this.eventForUpdate).subscribe(
        () => {},
    );
  }


}
