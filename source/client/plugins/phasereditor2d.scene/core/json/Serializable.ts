namespace phasereditor2d.scene.core.json {

    export interface WriteArgs {
        data: ObjectData;
        table: SceneDataTable;
    }

    export interface ReadArgs {
        data: ObjectData;
        table: SceneDataTable;
    }

    export interface Serializable {

        writeJSON(ser: Serializer): void;

        readJSON(ser: Serializer): void;
    }
}