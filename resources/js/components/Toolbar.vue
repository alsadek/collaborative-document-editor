<template>
    <div class="toolbar mb-3">
        <button type="button" @click="formatText('bold')" title="Bold"><strong>B</strong></button>
        <button type="button" @click="formatText('italic')" title="Italic"><em>I</em></button>
        <button type="button" @click="formatText('underline')" title="Underline"><u>U</u></button>
        <button type="button" @click="formatText('strikeThrough')" title="Strikethrough"><s>S</s></button>
        <button type="button" @click="formatText('insertOrderedList')" title="Ordered List">OL</button>
        <button type="button" @click="formatText('insertUnorderedList')" title="Unordered List">UL</button>
        <button type="button" @click="formatText('justifyLeft')" title="Align Left">Left</button>
        <button type="button" @click="formatText('justifyCenter')" title="Align Center">Center</button>
        <button type="button" @click="formatText('justifyRight')" title="Align Right">Right</button>
    </div>
</template>

<script>
export default {
    methods: {
        formatText(command) {
            document.execCommand(command, false, null);
        }
    }
}
</script>
