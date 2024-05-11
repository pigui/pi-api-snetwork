import { Observable } from 'rxjs';
import { Inbox } from '../entities/inbox';

export abstract class InboxRepository {
  abstract create(inbox: Inbox): Observable<Inbox>;
  abstract find(): Observable<Array<Inbox>>;
  abstract findStatus(
    status: 'pending' | 'processed'
  ): Observable<Array<Inbox>>;
  abstract delete(inbox: Inbox): Observable<void>;
}
