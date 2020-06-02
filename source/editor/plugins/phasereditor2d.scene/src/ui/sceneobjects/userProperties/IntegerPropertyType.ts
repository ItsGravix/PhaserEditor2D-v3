/// <reference path="NumberPropertyType.ts" />

namespace phasereditor2d.scene.ui.sceneobjects {

    export class IntegerPropertyType extends NumberPropertyType {

        getName() {

            return "Integer";
        }

        renderValue(value: number) {

            return Math.floor(value).toString();
        }

        createEditorElement(getValue: () => any, setValue: (value: any) => void): IPropertyEditor {

            const element = document.createElement("input");
            element.type = "text";
            element.classList.add("formText");

            element.addEventListener("change", e => {

                let value = Number.parseInt(element.value, 10);

                if (Number.isNaN(value)) {

                    value = getValue();
                }

                setValue(value);
            });

            const update = () => {

                element.value = (getValue() as number).toString();
            };

            return {
                element,
                update
            };
        }
    }
}