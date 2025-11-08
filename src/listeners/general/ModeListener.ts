import { ModeSwitch } from './../../services/ModeSwitch';
import { CONTEXT, FEATURE_FLAG, GeneralCommands, SETTING_GLOBAL_MODES } from '../../constants';
import { DashboardMessage } from '../../dashboardWebView/DashboardMessage';
import { Mode, PostMessageData } from '../../models';
import { CommandToCode } from '../../panelWebView/CommandToCode';
import { BaseListener } from './BaseListener';
import { Settings } from '../../helpers';
import { commands } from 'vscode';

export class ModeListener extends BaseListener {
  /**
   * Process the messages
   * @param msg
   */
  public static process(msg: PostMessageData) {
    super.process(msg as any);

    switch (msg.command) {
      case DashboardMessage.getMode:
      case CommandToCode.getMode:
        this.getMode();
        break;
    }
  }

  public static async getMode() {
    const modes = Settings.get<Mode[]>(SETTING_GLOBAL_MODES);
    if (!modes || modes.length === 0) {
      await this.resetEnablement();
      return;
    }

    const activeMode = ModeSwitch.getMode();
    if (activeMode) {
      const mode = modes.find((m) => m.id === activeMode);
      this.sendMsg(GeneralCommands.toWebview.setMode as any, mode);

      // Dashboard features are ignored in this version since dashboard is disabled


    } else {
      this.sendMsg(GeneralCommands.toWebview.setMode as any, undefined);

      // Enable dashboards
      await this.resetEnablement();
    }
  }

  /**
   * Check if the mode has the feature enabled
   * @param feature
   * @returns
   */
  public static async hasFeature(feature: string) {
    const modes = Settings.get<Mode[]>(SETTING_GLOBAL_MODES);

    if (!modes || modes.length === 0) {
      return true;
    }

    const activeMode = ModeSwitch.getMode();
    if (activeMode) {
      const mode = modes.find((m) => m.id === activeMode);
      return mode?.features.find((f) => f === feature);
    }

    return true;
  }

  /**
   * Reset the context
   */
  public static async resetEnablement() {
    // Dashboard functionality is disabled in this version
  }
}
