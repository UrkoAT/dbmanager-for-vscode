<script lang="ts">
  import { onMount, createEventDispatcher, SvelteComponent } from "svelte";
  import { RenderDType } from "../types/RenderDType";
  import TextEditor from "./editors/TextEditor.svelte";
  import NumberEditor from "./editors/NumberEditor.svelte";
  import BooleanEditor from "./editors/BooleanEditor.svelte";
  import DateEditor from "./editors/DateEditor.svelte";
  import TimeEditor from "./editors/TimeEditor.svelte";
  import DateTimeEditor from "./editors/DateTimeEditor.svelte";
  import JSONEditor from "./editors/JSONEditor.svelte";

  export let row_index: number;
  export let col_index: number;
  export let value: any;
  export let data_type: RenderDType;

  // Change when adding new editors
  const editorLookup = {
    [RenderDType.text]: TextEditor,
    [RenderDType.number]: TextEditor,
    [RenderDType.boolean]: TextEditor,
    [RenderDType.date]: TextEditor,
    [RenderDType.time]: TextEditor,
    [RenderDType.datetime]: TextEditor,
    [RenderDType.json]: TextEditor,
  };

  let cell: HTMLTableCellElement;
  let editorVisible: boolean = false;
  let dispatch = createEventDispatcher();
  let component: SvelteComponent;

  function checkEmptyOrNull(val: any) {
    return val === null || val === undefined || val === "";
  }

  function getEditor() {
    return editorLookup[data_type];
  }

  function setEditorVisible() {
    editorVisible = true;
  }

  function setEditorInvisible() {
    editorVisible = false;
  }

  onMount(() => {
    if (checkEmptyOrNull(value)) {
      cell.classList.add("empty");
    } else {
      cell.classList.add(RenderDType.toString(data_type));
    }
  });
</script>

<td bind:this={cell} data-row_index={row_index} data-col_index={col_index} on:focus={setEditorVisible} on:blur={setEditorInvisible}>
  <svelte:component this={getEditor()} {value} bind:visible={editorVisible} on:message />
</td>
