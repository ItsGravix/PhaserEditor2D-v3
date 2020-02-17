namespace phasereditor2d.scene.ui.sceneobjects {

    import code = core.code;

    export class BitmapTextCodeDOMBuilder extends ObjectCodeDOMBuilder {

        buildCreateObjectWithFactoryCodeDOM(args: IBuildObjectFactoryCodeDOMArgs): code.MethodCallCodeDOM {

            const call = new code.MethodCallCodeDOM("bitmapText", args.gameObjectFactoryExpr);

            const obj = args.obj as BitmapText;

            call.argFloat(obj.x);
            call.argFloat(obj.y);
            call.argLiteral(obj.font);
            call.argLiteral(obj.text);

            return call;
        }

        buildCreatePrefabInstanceCodeDOM(args: IBuildPrefabConstructorCodeDOMArgs): void {

            const call = args.methodCallDOM;

            const obj = args.obj as BitmapText;
            const support = args.obj.getEditorSupport();

            call.arg(args.sceneExpr);

            call.argFloat(obj.x);
            call.argFloat(obj.y);

            if (support.isUnlockedProperty(BitmapTextComponent.font)) {

                call.argLiteral(obj.font);

            } else {

                call.arg("undefined");
            }
        }

        buildPrefabConstructorDeclarationCodeDOM(args: IBuildPrefabConstructorDeclarationCodeDOM): void {

            const ctr = args.ctrDeclCodeDOM;

            ctr.arg("x", "number");
            ctr.arg("y", "number");
            ctr.arg("font", "string", true);
        }

        buildPrefabConstructorDeclarationSupperCallCodeDOM(
            args: IBuildPrefabConstructorDeclarationSupperCallCodeDOMArgs): void {

            const obj = args.prefabObj as BitmapText;
            const support = obj.getEditorSupport();

            const call = args.superMethodCallCodeDOM;

            call.arg("x");
            call.arg("y");

            if (support.isLockedProperty(BitmapTextComponent.font)) {

                call.arg("font");

            } else {

                call.arg("font || " + code.CodeDOM.quote(obj.font));
            }
        }
    }
}