namespace phasereditor2d.scene.ui.sceneobjects {

    import json = core.json;

    export abstract class GlobalListOperation extends editor.undo.SceneEditorOperation {

        private _before: json.IObjectListData[];
        private _after: json.IObjectListData[];

        constructor(editor: editor.SceneEditor) {
            super(editor);
        }

        abstract performChange(lists: ObjectLists): void;

        execute() {

            const selManager = this._editor.getSelectionManager();

            const lists = this._editor.getScene().getObjectLists();

            this._before = lists.toJSON_lists();

            this.performChange(lists);

            this._after = lists.toJSON_lists();

            const sel = selManager.getSelectionIds();

            this.loadData(this._after, sel);
        }

        private loadData(data: json.IObjectListData[], selection?: string[]) {

            const lists = this._editor.getScene().getObjectLists();

            lists.readJSON_lists(data);

            this._editor.setDirty(true);

            this._editor.refreshOutline();

            if (selection) {

                this._editor.getSelectionManager().setSelectionByIds(selection);
            }
        }

        undo(): void {

            this.loadData(this._before);

        }

        redo(): void {

            this.loadData(this._after);
        }
    }
}