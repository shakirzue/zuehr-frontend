import { ModuleName } from './enum/Module_Enum';

export function getModuleName(param) {
    switch(param) {
        case '/SM/ModuleSelection':
            return ModuleName.SMUpload;
        case '/DM/DMDashboardPage':
            return ModuleName.DMDashboard;
        case '/DM/DMCreateActionPage':
            return ModuleName.DMAction;
        case '/DM/DMActionViewPage':
            return ModuleName.DMAction;
        case 'Wipsam':
            return ModuleName.ReportWipsam;
        case 'WipsamManagement':
            return ModuleName.ReportWipsamManagement;
        case 'WipsamPCA':
            return ModuleName.ReportWipsamPCA;
        case 'AuditReport':
            return ModuleName.ReportAudit;
        case 'PricingTool':
            return ModuleName.ReportPriceReport;
      default:
        return '/';
    }
  }