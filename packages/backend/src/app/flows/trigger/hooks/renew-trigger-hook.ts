import { FlowVersion, ProjectId, TriggerHookType } from '@activepieces/shared'
import { engineHelper } from '../../../helper/engine-helper'
import { webhookService } from '../../../webhooks/webhook-service'
import { logger } from '../../../helper/logger'

export async function renewWebhook(params: Params): Promise<void> {
    const {  flowVersion, projectId, simulate } = params
    try {
        await engineHelper.executeTrigger({
            hookType: TriggerHookType.RENEW,
            flowVersion,
            webhookUrl: await webhookService.getWebhookUrl({
                flowId: flowVersion.flowId,
                simulate,
            }),
            projectId,
        })
    }
    catch (e) {
        logger.error(`Failed to renew webhook for flow ${flowVersion.flowId} in project ${projectId}`, e)
    }
}

type Params = {
    flowVersion: FlowVersion
    projectId: ProjectId
    simulate: boolean
}
