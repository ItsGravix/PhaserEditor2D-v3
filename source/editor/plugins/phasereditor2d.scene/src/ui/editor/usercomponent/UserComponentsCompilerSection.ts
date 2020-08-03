namespace phasereditor2d.scene.ui.editor.usercomponent {

    import controls = colibri.ui.controls;

    export class UserComponentsCompilerSection extends controls.properties.PropertySection<UserComponentsModel> {

        constructor(page: controls.properties.PropertyPage) {
            super(page,
                "phasereditor2d.scene.ui.editor.usercomponent.UserComponentsCompilerSection",
                "Compiler Settings", false, false);
        }

        hasMenu() {

            return true;
        }

        createMenu(menu: controls.Menu) {

            ide.IDEPlugin.getInstance().createHelpMenuItem(menu, "scene-editor/user-components-compiler.html");
        }

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElement(parent, 2);

            {
                // Output Lang

                this.createLabel(comp, "Output Language", "The components code output language.");
                const btn = this.createMenuButton(comp, "", [{
                    name: "JavaScript",
                    value: core.json.SourceLang.JAVA_SCRIPT
                }, {
                    name: "TypeScript",
                    value: core.json.SourceLang.TYPE_SCRIPT
                }], value => {

                    this.getEditor().runOperation(model => {

                        model.setOutputLang(value);

                        this.updateWithSelection();
                    });
                });

                this.addUpdater(() => {

                    const lang = this.getSelectionFirstElement().getOutputLang();

                    btn.textContent = lang === core.json.SourceLang.JAVA_SCRIPT ?
                        "JavaScript" : "TypeScript";
                });
            }
        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof UserComponentsModel;
        }

        canEditNumber(n: number): boolean {

            return n === 1;
        }

        getEditor() {

            return colibri.Platform.getWorkbench()
                .getActiveWindow().getEditorArea()
                .getSelectedEditor() as UserComponentsEditor;
        }
    }
}