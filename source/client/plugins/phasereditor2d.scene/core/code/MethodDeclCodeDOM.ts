namespace phasereditor2d.scene.core.code {

    export class MethodDeclCodeDOM extends MemberDeclCodeDOM {

        private _instructions: CodeDOM[];

        constructor(name: string) {
            super(name);

            this._instructions = [];
        }

        getInstructions() {
            return this._instructions;
        }

        setInstructions(instructions: CodeDOM[]) {
            this._instructions = instructions;
        }
    }
}