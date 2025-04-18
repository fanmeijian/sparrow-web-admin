import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { first, Subject } from "rxjs";
import * as monaco from "monaco-editor";
import { RuleService } from '@sparrowmini/org-api'
import { ActivatedRoute } from "@angular/router";
import { MonacoEditorService } from '../../../service/monaco-editor.service';


@Component({
  selector: "spr-rule-create",
  templateUrl: "./rule-create.component.html",
  styleUrls: ["./rule-create.component.css"],
})
export class RuleCreateComponent implements OnInit, AfterViewInit {
  allowSyntheticDefaultImports
  public loadingFinished: Subject<void> = new Subject<void>();

  submit() {
    console.log(this._editor.getValue())
    this.formGroup.patchValue({ drl: this._editor.getValue() })

    if(this.formGroup.value.id){
      this.rulesService.updateRule(this.formGroup.value,this.formGroup.value.id).subscribe()
    }else{
      this.rulesService.newRule([this.formGroup.value]).subscribe()
    }

  }
  formGroup: FormGroup = this.fb.group({
    id: [null],
    description: [null, Validators.required],
    name: [null, Validators.required],
    drl: [null],
    ruleCondition: [null],
  });

  models: any;
  constructor(
    private fb: FormBuilder,
    private rulesService: RuleService,
    private monacoEditorService: MonacoEditorService,
    private route: ActivatedRoute,
  ) { }
  ngAfterViewInit(): void {
    // console.log(this._editorContainer.nativeElement);
    const baseUrl = "./assets/monaco-editor/min/vs";

    const onGotAmdLoader: any = () => {
      // load Monaco
      (<any>window).require.config({ paths: { vs: `${baseUrl}` } });
      (<any>window).require([`vs/editor/editor.main`], () => {
        this.loadingFinished.next((<any>window).monaco)
        this.initMonaco().then(() => {

          this.route.params.subscribe((params: any) => {
            if (params.id) {
              this.rulesService.getRule(params.id).subscribe(res => {
                this.formGroup.patchValue(res)
                this._editor?.setValue(res.drl ? res.drl : '')
              })
            }
          })
        })
      });
    };

    const loaderScript: HTMLScriptElement = document.createElement("script");
    loaderScript.type = "text/javascript";
    loaderScript.src = `${baseUrl}/loader.js`;
    loaderScript.addEventListener("load", onGotAmdLoader);
    document.body.appendChild(loaderScript);



  }

  ngOnInit(): void {
    // this.rulesService.().subscribe((res) => {
    //   this.models = res;
    // });

  }

  public _editor: monaco.editor.IStandaloneCodeEditor;
  @ViewChild("editorContainer", { static: true })
  _editorContainer!: ElementRef<any>;

  private async initMonaco(): Promise<void> {
    console.log(this.monacoEditorService.loaded);
    if (!this.monacoEditorService.loaded) {
      this.monacoEditorService.loadingFinished.pipe(first()).subscribe(() => {
        console.log('99999', this.monacoEditorService.loaded);
        this.initMonaco();
      });

      let keywords = ["class", "public"];
      monaco.languages.register({ id: "java" });
      // monaco.languages.setMonarchTokensProvider('java', {
      //   keywords,
      //   tokenizer: {
      //     root: [
      //       [
      //         /@?[a-zA-Z][\w$]*/, {
      //           cases: {
      //             '@keywords': 'keyword',
      //             '@default': 'variable',
      //           }
      //         }
      //       ],
      //       [/".*?"/, 'string'],
      //       [/\/\//, 'comment'],
      //     ]
      //   }
      // })
      const allLangs: any = await monaco.languages.getLanguages();
      const { language: javaLang } = await allLangs
        .find(({ id }: any) => id === "java")
        .loader();
      // Add syntaxhighlighting for handlebars delimiters
      const customTokenizer: any = {
        defaultToken: "",
        tokenPostfix: ".java",

        keywords: [
          "lock-on-active",
          "date-effective",
          "date-expires",
          "no-loop",
          "auto-focus",
          "activation-group",
          "agenda-group",
          "ruleflow-group",
          "entry-point",
          "duration",
          "package",
          "import",
          "dialect",
          "salience",
          "enabled",
          "attributes",
          "rule",
          "extend",
          "when",
          "then",
          "template",
          "query",
          "declare",
          "function",
          "global",
          "eval",
          "not",
          "in",
          "or",
          "and",
          "exists",
          "forall",
          "accumulate",
          "collect",
          "from",
          "action",
          "reverse",
          "result",
          "end",
          "over",
          "init",
        ],

        operators: [
          "=",
          ">",
          "<",
          "!",
          "~",
          "?",
          ":",
          "==",
          "<=",
          ">=",
          "!=",
          "&&",
          "||",
          "++",
          "--",
          "+",
          "-",
          "*",
          "/",
          "&",
          "|",
          "^",
          "%",
          "<<",
          ">>",
          ">>>",
          "+=",
          "-=",
          "*=",
          "/=",
          "&=",
          "|=",
          "^=",
          "%=",
          "<<=",
          ">>=",
          ">>>=",
        ],

        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes:
          /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        digits: /\d+(_+\d+)*/,
        octaldigits: /[0-7]+(_+[0-7]+)*/,
        binarydigits: /[0-1]+(_+[0-1]+)*/,
        hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

        // The main tokenizer for our languages
        tokenizer: {
          root: [
            // identifiers and keywords
            [
              /[a-zA-Z_$][\w$]*/,
              {
                cases: {
                  "@keywords": { token: "keyword.$0" },
                  "@default": "identifier",
                },
              },
            ],

            // whitespace
            { include: "@whitespace" },

            // delimiters and operators
            [/[{}()\[\]]/, "@brackets"],
            [/[<>](?!@symbols)/, "@brackets"],
            [
              /@symbols/,
              {
                cases: {
                  "@operators": "delimiter",
                  "@default": "",
                },
              },
            ],

            // @ annotations.
            [/@\s*[a-zA-Z_\$][\w\$]*/, "annotation"],

            // numbers
            [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, "number.float"],
            [
              /(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/,
              "number.float",
            ],
            [/0[xX](@hexdigits)[Ll]?/, "number.hex"],
            [/0(@octaldigits)[Ll]?/, "number.octal"],
            [/0[bB](@binarydigits)[Ll]?/, "number.binary"],
            [/(@digits)[fFdD]/, "number.float"],
            [/(@digits)[lL]?/, "number"],

            // delimiter: after number because of .\d floats
            [/[;,.]/, "delimiter"],

            // strings
            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
            [/"/, "string", "@string"],

            // characters
            [/'[^\\']'/, "string"],
            [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
            [/'/, "string.invalid"],
          ],

          whitespace: [
            [/[ \t\r\n]+/, ""],
            [/\/\*\*(?!\/)/, "comment.doc", "@javadoc"],
            [/\/\*/, "comment", "@comment"],
            [/\/\/.*$/, "comment"],
          ],

          comment: [
            [/[^\/*]+/, "comment"],
            // [/\/\*/, 'comment', '@push' ],    // nested comment not allowed :-(
            // [/\/\*/,    'comment.invalid' ],    // this breaks block comments in the shape of /* //*/
            [/\*\//, "comment", "@pop"],
            [/[\/*]/, "comment"],
          ],
          //Identical copy of comment above, except for the addition of .doc
          javadoc: [
            [/[^\/*]+/, "comment.doc"],
            // [/\/\*/, 'comment.doc', '@push' ],    // nested comment not allowed :-(
            [/\/\*/, "comment.doc.invalid"],
            [/\*\//, "comment.doc", "@pop"],
            [/[\/*]/, "comment.doc"],
          ],

          string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, "string", "@pop"],
          ],
        },
      };

      monaco.languages.setMonarchTokensProvider("java", customTokenizer);

      // {
      //   tokenizer: {
      //     root: [
      //       [/\\{\\{/, { token: 'delimiter.handlebars' }],
      //       [/\\}\\}/, { token: 'delimiter.handlebars' }],
      //       [/\\{\\{#/, { token: 'delimiter.handlebars' }],
      //     ]
      //   }
      // }
      // for (const key in customTokenizer) {
      //   const value = customTokenizer[key]
      //   if (key === 'tokenizer') {
      //     for (const category in value) {
      //       const tokenDefs = value[category]
      //       // eslint-disable-next-line
      //       if (!javaLang.tokenizer.hasOwnProperty(category)) {
      //         javaLang.tokenizer[category] = []
      //       }
      //       if (Array.isArray(tokenDefs)) {
      //         javaLang.tokenizer[category].unshift.apply(javaLang.tokenizer[category], tokenDefs)
      //       }
      //     }
      //   }
      // }

      console.log(allLangs);
      monaco.languages.registerCompletionItemProvider("java", {
        provideCompletionItems: (model: any, position: any) => {
          console.log(model, position);

          const suggestions: any = [
            // ...this.models.map((k:any) => {
            //   return {
            //     label: k.className.split('.')[k.className.split('.').length-1],
            //     kind: monaco.languages.CompletionItemKind.Keyword,
            //     insertText: k.className.split('.')[k.className.split('.').length-1],
            //   }
            // })
            ...customTokenizer.keywords.map((k: any) => {
              return {
                label: k,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: k,
              };
            }),
          ];
          console.log({ suggestions: [suggestions] });
          return { suggestions: suggestions };
        },
      });
      this._editor = monaco.editor.create(this._editorContainer.nativeElement, {
        language: "java",
        theme: "vs-dark",
      });

      return;
    }
  }
}
