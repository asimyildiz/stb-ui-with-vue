import DesktopChannelService from '../vendors/desktop/services/DesktopChannelService';
import DesktopVolumeService from '../vendors/desktop/services/DesktopVolumeService';
import DesktopProgramService from '../vendors/desktop/services/DesktopProgramService';
window.bein = {};
window.bein.channelService = new DesktopChannelService();
window.bein.volumeService = new DesktopVolumeService();
window.bein.programService = new DesktopProgramService();
