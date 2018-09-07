import DesktopVolumeService from '../vendors/desktop/services/DesktopVolumeService';
import DesktopProgramService from '../vendors/desktop/services/DesktopProgramService';
import DesktopChannelService from '../vendors/desktop/services/DesktopChannelService';
window.bein = {};
window.bein.volumeService = new DesktopVolumeService();
window.bein.programService = new DesktopProgramService();
window.bein.channelService = new DesktopChannelService();
