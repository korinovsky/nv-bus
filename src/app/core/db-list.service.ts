import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {BehaviorSubject} from "rxjs";
import {DbItem} from "~core/models/db.model";

export abstract class DbListService<T extends DbItem> {
    items = new BehaviorSubject<T[]>(undefined);
    private list: AngularFireList<T>;

    protected constructor(private db: AngularFireDatabase, pathOrRef?: string) {
        if (pathOrRef) {
            this.init(pathOrRef);
        }
    }

    protected init(pathOrRef: string) {
        this.list = this.db.list<T>(pathOrRef);
        this.list.snapshotChanges()
            .subscribe(items => this.items.next(items.map(({key, payload}) => ({key, ...payload.val()}))));
    }

    push(item: T) {
        return this.list.push(item) as Promise<any>;
    }

    update(item: T, itemKey?: string) {
        if (itemKey === undefined) {
            const {key, ...rest} = item;
            itemKey = key;
            item = rest as any;
        }
        return this.list.update(itemKey, item) as Promise<any>;
    }

    remove(key: string) {
        return this.list.remove(key) as Promise<any>;
    }
}
