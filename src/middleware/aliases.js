import DesktopVolumeService from '../../sdk/vendors/desktop/services/DesktopVolumeService';
import DesktopVodService from '../../sdk/vendors/desktop/services/DesktopVodService';
import BootManager from '../../sdk/managers/common/BootManager';
import VodManager from '../../sdk/managers/vod/VodManager';
import DesktopChannelService from '../../sdk/vendors/desktop/services/DesktopChannelService';
import DesktopProgramService from '../../sdk/vendors/desktop/services/DesktopProgramService';

window.beINFW = {};
window.beINFW.volumeService = new DesktopVolumeService();
window.beINFW.vodService = new DesktopVodService();
window.beINFW.bootManager = new BootManager();
window.beINFW.vodManager = new VodManager();
window.beINFW.channelService = new DesktopChannelService();
window.beINFW.programService = new DesktopProgramService();
