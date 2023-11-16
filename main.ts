import { Menu, Notice, App, Modal, Plugin, SuggestModal, Editor, IconName } from 'obsidian'

interface Book {
	name: string;
	special: string;
	icon: IconName;
}
  
const ALL_BOOKS = [
{
	name: "example",
	special: "dropdown",
	icon: "example",
},{
	name: "example",
	special: "normal",
	icon: "",
},
];

function insertDropdown(text: string) {
	const editor = app.workspace.activeEditor?.editor;
	if (editor) {
		const insert = "> [!" + text + "]- ";
		const selection = editor?.getSelection();
		if (selection) {
			const calloutSelection = selection.split('\n').join('\n> ');
			const replace = insert + "\n> " + calloutSelection;
			editor.replaceSelection(replace);
			editor.setCursor(editor.offsetToPos(insert.length));
		}else{
			editor.replaceRange(
				insert,
				editor.getCursor(),
			);
			editor.setCursor(editor.offsetToPos(insert.length));
		}
	}
}
function insertNormal(text: string) {
	const editor = app.workspace.activeEditor?.editor
	if (editor) {
		const insert = "> [!" + text + "] ";
		const selection = editor?.getSelection();
		if (selection) {
			const calloutSelection = selection.split('\n').join('\n> ');
			const replace = insert + "\n> " + calloutSelection;
			editor.replaceSelection(replace);
			editor.setCursor(editor.offsetToPos(insert.length));
		}else{
			editor.replaceRange(
				insert,
				editor.getCursor(),
			);
			editor.setCursor(editor.offsetToPos(insert.length));
		}
	}
}
function insertCode(text: string) {
	const editor = app.workspace.activeEditor?.editor
	if (editor) {
		const insert = "> [!" + text + "] ";
		const selection = editor?.getSelection();
		if (selection) {
			const calloutSelection = selection.split('\n').join('\n> ');
			const replace = insert + "\n> ```\n> " + calloutSelection + "\n>```";
			editor.replaceSelection(replace);
			editor.setCursor(editor.offsetToPos(insert.length));
		}else{
			const codeInsert = insert + "\n> ```\n> \n> ```"
			editor.replaceRange(
				insert,
				editor.getCursor(),
			);
			editor.setCursor(editor.offsetToPos(insert.length));
		}
	}
}
function removeCallout() {
	const editor = app.workspace.activeEditor?.editor
	if (editor) {
		const calloutSelection = editor?.getSelection();
		if (calloutSelection) {
			const selection = calloutSelection.replace(/> \[!.*\]-?/i,"").split('\n> ').join('\n');
			editor.replaceSelection(selection);
		}else{
			new Notice("No text selected")
		}
	}
}

export default class ExamplePlugin extends Plugin {
	statusBarTextElement: HTMLSpanElement;

	onload() {
		this.statusBarTextElement = this.addStatusBarItem().createEl('span');
		this.readActiveFileAndUpdateLineCount();

		this.app.workspace.on('active-leaf-change', async () => {
			this.readActiveFileAndUpdateLineCount();
		});

		this.app.workspace.on('editor-change', (editor) => {
			const content = editor.getDoc().getValue();
			this.updateLineCount(content);
		});

		this.addRibbonIcon("scan", "Delete Selected Callout", () => {
			removeCallout()
		});

		this.addRibbonIcon("terminal-square", "Code Callout Menu", (event) => {
			const menu = new Menu();
	  
			menu.addItem((item) =>
			  item
				.setTitle("Note")
				.setIcon("pencil")
				.onClick(() => {
					insertCode("note");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Summary")
				.setIcon("clipboard-list")
				.onClick(() => {
					insertCode("summary");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Info")
				.setIcon("info")
				.onClick(() => {
					insertCode("info");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("ToDo")
				.setIcon("check-circle")
				.onClick(() => {
					insertCode("todo");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Hint")
				.setIcon("flame")
				.onClick(() => {
					insertCode("hint");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Check")
				.setIcon("check")
				.onClick(() => {
					insertCode("check");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Help")
				.setIcon("help")//
				.onClick(() => {
					insertCode("help");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Warning")
				.setIcon("alert-triangle")
				.onClick(() => {
					insertCode("warning");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Failure")
				.setIcon("x")
				.onClick(() => {
					insertCode("failure");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Danger")
				.setIcon("zap")
				.onClick(() => {
					insertCode("danger");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Bug")
				.setIcon("bug")//
				.onClick(() => {
					insertCode("bug");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Example")
				.setIcon("list")
				.onClick(() => {
					insertCode("example");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Quote")
				.setIcon("quote")//
				.onClick(() => {
				  insertCode("quote");
				})
			);
			menu.showAtMouseEvent(event);
		});
		
		this.addRibbonIcon("chevron-down-square", "Dropdown Callout Menu", (event) => {
			const menu = new Menu();
	  
			menu.addItem((item) =>
			  item
				.setTitle("Note")
				.setIcon("pencil")
				.onClick(() => {
					insertDropdown("note");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Summary")
				.setIcon("clipboard-list")
				.onClick(() => {
				  insertDropdown("summary");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Info")
				.setIcon("info")
				.onClick(() => {
					insertDropdown("info");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("ToDo")
				.setIcon("check-circle")
				.onClick(() => {
					insertDropdown("todo");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Hint")
				.setIcon("flame")
				.onClick(() => {
				  insertDropdown("hint");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Check")
				.setIcon("check")
				.onClick(() => {
					insertDropdown("check");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Help")
				.setIcon("help")//
				.onClick(() => {
					insertDropdown("help");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Warning")
				.setIcon("alert-triangle")
				.onClick(() => {
				  insertDropdown("warning");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Failure")
				.setIcon("x")
				.onClick(() => {
				  insertDropdown("failure");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Danger")
				.setIcon("zap")
				.onClick(() => {
					insertDropdown("danger");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Bug")
				.setIcon("bug")//
				.onClick(() => {
				  insertDropdown("bug");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Example")
				.setIcon("list")
				.onClick(() => {
					insertDropdown("example");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Quote")
				.setIcon("quote")//
				.onClick(() => {
				  insertDropdown("quote");
				})
			);
	  
			menu.showAtMouseEvent(event);
		});

		this.addRibbonIcon("square", "Normal Callout Menu", (event) => {
			const menu = new Menu();
	  
			menu.addItem((item) =>
			  item
				.setTitle("Note")
				.setIcon("pencil")
				.onClick(() => {
					insertNormal("note");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Summary")
				.setIcon("clipboard-list")
				.onClick(() => {
					insertNormal("summary");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Info")
				.setIcon("info")
				.onClick(() => {
					insertNormal("info");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("ToDo")
				.setIcon("check-circle")
				.onClick(() => {
					insertNormal("todo");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Hint")
				.setIcon("flame")
				.onClick(() => {
					insertNormal("hint");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Check")
				.setIcon("check")
				.onClick(() => {
					insertNormal("check");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Help")
				.setIcon("help")//
				.onClick(() => {
					insertNormal("help");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Warning")
				.setIcon("alert-triangle")
				.onClick(() => {
					insertNormal("warning");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Failure")
				.setIcon("x")
				.onClick(() => {
					insertNormal("failure");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Danger")
				.setIcon("zap")
				.onClick(() => {
					insertNormal("danger");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Bug")
				.setIcon("bug")//
				.onClick(() => {
					insertNormal("bug");
				})
			);
	  
			menu.addItem((item) =>
			  item
				.setTitle("Example")
				.setIcon("list")
				.onClick(() => {
					insertNormal("example");
				})
			);

			menu.addItem((item) =>
			  item
				.setTitle("Quote")
				.setIcon("quote")//
				.onClick(() => {
				  insertNormal("quote");
				})
			);
			menu.showAtMouseEvent(event);
		});
	}

	private updateLineCount(fileContent?: string) {
		const count = fileContent ? fileContent.split(/\r\n|\r|\n/).length : 0;
		const linesWord = count === 1 ? "line" : "lines";
		this.statusBarTextElement.textContent = `${count} ${linesWord}`;
	}

	private async readActiveFileAndUpdateLineCount() {
		const file = this.app.workspace.getActiveFile();
		if (file){
			const content = await this.app.vault.read(file);
			this.updateLineCount(content);
		} else {
			this.updateLineCount(undefined);
		}
	}
}