import DesktopVolumeService from '../vendors/desktop/services/DesktopVolumeService';
import DesktopChannelService from '../vendors/desktop/services/DesktopChannelService';
import DesktopProgramService from '../vendors/desktop/services/DesktopProgramService';
window.bein = {};
window.bein.volumeService = new DesktopVolumeService();
window.bein.channelService = new DesktopChannelService();
window.bein.programService = new DesktopProgramService();
