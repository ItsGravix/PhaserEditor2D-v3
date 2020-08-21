namespace cprewritten.net.demo {

    import controls = colibri.ui.controls;

    export const CMD_CREATE_CUSTOM_SCENE_FILE = "cprewritten.net.demo.CreateCustomSceneFile";
    export const CAT_CUSTOM_SCENES = "cprewritten.net.demo.CustomScenes";

    export class CPDemoPlugin extends colibri.Plugin {

        private static _instance = new CPDemoPlugin();

        static getInstance() {
            return this._instance;
        }

        private constructor() {
            super("cprewritten.net.demo");
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            reg.addExtension(
                new colibri.ui.ide.commands.CommandExtension(manager => {

                    manager.addCategory({
                        id: CAT_CUSTOM_SCENES,
                        name: "Custom Scenes"
                    });

                    manager.add({
                        command: {
                            id: CMD_CREATE_CUSTOM_SCENE_FILE,
                            name: "Create Custom Scene File",
                            category: CAT_CUSTOM_SCENES,
                            tooltip: "Create a custom scene in a fixed folder"
                        },
                        keys: {
                            control: true,
                            key: "0"
                        },
                        handler: {
                            testFunc: args => args.activeWindow instanceof phasereditor2d.ide.ui.DesignWindow,
                            executeFunc: async (args) => {

                                const FileUtils = colibri.ui.ide.FileUtils;

                                const root = FileUtils.getRoot();

                                const dstFolderName = "cprewritten_scenes";

                                let dstFolder = root.getFile(dstFolderName);

                                if (!dstFolder) {

                                    dstFolder = await FileUtils.createFolder_async(FileUtils.getRoot(), dstFolderName);
                                }

                                const dlg = new controls.dialogs.InputDialog();

                                dlg.create();

                                dlg.setTitle("New Custom Scene");

                                dlg.setMessage(
                                    `Enter the name of the new scene. ` +
                                    `Don't include the extension. ` +
                                    `It will be created in the folder ${dstFolder.getProjectRelativeName()}`);

                                dlg.setInputValidator(value => {

                                    const fullName = dstFolder.getFullName() + "/" + value + ".scene";

                                    const file = FileUtils.getFileFromPath(fullName);

                                    return file === null;
                                });

                                dlg.setInitialValue("MyScene");

                                dlg.validate();

                                dlg.setResultCallback(async (value) => {

                                    const fileName = value + ".scene";

                                    const sceneData: phasereditor2d.scene.core.json.ISceneData = {
                                        id: Phaser.Utils.String.UUID(),
                                        sceneType: phasereditor2d.scene.core.json.SceneType.SCENE,
                                        settings: {},
                                        displayList: [],
                                        meta: {
                                            app: "Phaser Editor 2D - Scene Editor",
                                            url: "https://phasereditor2d.com",
                                            contentType: phasereditor2d.scene.core.CONTENT_TYPE_SCENE
                                        }
                                    };

                                    const fileContent = JSON.stringify(sceneData, null, 4);

                                    const file = await FileUtils.createFile_async(dstFolder, fileName, fileContent);

                                    colibri.Platform.getWorkbench().openEditor(file);
                                });
                            }
                        }
                    });
                }));
        }
    }

    colibri.Platform.addPlugin(CPDemoPlugin.getInstance());
}