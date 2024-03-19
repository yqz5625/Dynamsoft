<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import type { TextLineResultItem } from "dynamsoft-label-recognizer"
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

const iptRef: Ref<HTMLInputElement | null> = ref(null);
const resRef: Ref<HTMLDivElement | null> = ref(null);
const pRouter: Ref<Promise<CaptureVisionRouter> | null> = ref(null);
const setting: any = ref(null);
onMounted(async () => {
    pRouter.value = CaptureVisionRouter.createInstance();
    const router = await pRouter.value;
    const template = {
        CaptureVisionTemplates: [
            {
                Name: 'passport-mrz',
                ImageROIProcessingNameArray: ['roi-mrz-passport'],
            },
        ],
        TargetROIDefOptions: [
            {
                Name: 'roi-mrz-passport',
                TaskSettingNameArray: ['task-mrz-passport'],
            },
        ],
        TextLineSpecificationOptions: [
            {
                Name: 'tls-mrz-text',
                StringRegExPattern: '([0-9]+)([A-Za-z]+)([0-9]+)',
                StringLengthRange: [3, 44],
            },
            {
                Name: 'tls-mrz-passport',
                StringLengthRange: [3, 44],
                BaseTextLineSpecificationName: 'tls-mrz-text',
            },
        ],
        LabelRecognizerTaskSettingOptions: [
            {
                Name: 'mrz-text-task',
                TextLineSpecificationNameArray: ['tls-mrz-text'],
                SectionImageParameterArray: [
                    {
                        Section: 'ST_REGION_PREDETECTION',
                        ImageParameterName: 'ip-mrz-text',
                    },
                    {
                        Section: 'ST_TEXT_LINE_LOCALIZATION',
                        ImageParameterName: 'ip-mrz-text',
                    },
                    {
                        Section: 'ST_TEXT_LINE_RECOGNITION',
                        ImageParameterName: 'ip-mrz-text',
                    },
                ],
            },
            {
                Name: 'task-mrz-passport',
                TextLineSpecificationNameArray: ['tls-mrz-passport'],
                BaseLabelRecognizerTaskSettingName: 'mrz-text-task',
            },
        ],
        CharacterModelOptions: [
            {
                Name: 'MRZ',
            },
        ],
        ImageParameterOptions: [
            {
                Name: 'ip-mrz-text',
                TextureDetectionModes: [
                    {
                        Mode: 'TDM_GENERAL_WIDTH_CONCENTRATION',
                        Sensitivity: 8,
                    },
                ],
                TextDetectionMode: {
                    Mode: 'TTDM_LINE',
                    CharHeightRange: [20, 1000, 1],
                    Sensitivity: 7,
                },
            },
        ],
    }
    await router.initSettings(template)
    // let setting = await router.getSimplifiedSettings();
    console.log(setting)

})

onUnmounted(async () => {
    (await pRouter.value)!.dispose();
    console.log('ImageRecognizer Component Unmount');
})

const captureImage = async (e: any) => {
    try {

        resRef.value!.innerText = "";
        const router = await pRouter.value;
        const results = await router!.capture(e.target.files[0],'passport-mrz');
        console.log(results)
        const res = [];
        for (let result of results.items) {
            console.log((result as TextLineResultItem).text);
            res.push((result as TextLineResultItem).text);
        }
        resRef.value!.innerText = res.join("\n");
        iptRef.value!.value = '';
    } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
        alert(errMsg);
    }
}
</script>

<template>
    <div class="capture-img">
        <div class="img-ipt"><input type="file" ref="iptRef" @change="captureImage" /></div>
        <div class="result-area" ref="resRef"></div>
    </div>
</template>

<style scoped>
.capture-img {
    width: 100%;
    height: 100%;
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
}

.capture-img .img-ipt {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    margin: 0 auto;
}

.capture-img .result-area {
    margin-top: 20px;
}
</style>