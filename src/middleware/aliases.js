import DesktopVolumeService from '../../sdk/vendors/desktop/services/DesktopVolumeService';
import DesktopProgramService from '../../sdk/vendors/desktop/services/DesktopProgramService';
import DesktopChannelService from '../../sdk/vendors/desktop/services/DesktopChannelService';
window.beINFW = {};
window.beINFW.volumeService = new DesktopVolumeService();
window.beINFW.programService = new DesktopProgramService();
window.beINFW.channelService = new DesktopChannelService();
