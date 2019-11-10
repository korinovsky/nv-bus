import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {BehaviorSubject} from "rxjs";

export abstract class DbListService<T> {
    items = new BehaviorSubject<T[]>(undefined);
    private list: AngularFireList<T>;

    protected constructor(db: AngularFireDatabase, pathOrRef: string) {
        this.list = db.list<T>(pathOrRef);
        this.list.snapshotChanges()
            .subscribe(items => this.items.next(items.map(({key, payload}) => ({key, ...payload.val()}))));
    }

    push(item: T) {
        return this.list.push(item) as Promise<any>;
    }

    update(key: string, item: T) {
        return this.list.update(key, item) as Promise<any>;
    }

    remove(key: string) {
        return this.list.remove(key) as Promise<any>;
    }
}
