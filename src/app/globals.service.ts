import { Injectable } from '@angular/core';


@Injectable()
export class GlobalsService {
  base_quiz_url: string = '/quiz-library';
  base_video_url: string = '/video-library';

  ca_url: string = '/ca';
  cs_url: string = '/cs';
  final_url: string = '/final';
  intermediate_url: string = '/intermediate';
  executive_url: string = '/executive';
  professional_url: string = '/professional';
  foundation_url: string = '/foundation';


  atlp_url: string = '/altp';
  tlp_url: string = '/ltp';

  fa16_url: string = '/fa2016';
  fa17_url: string = '/fa2017';
  fa18_url: string = '/fa2018';
  general_url = '/general';
  ammendments_url = '/amendments';
  case_laws_url = '/case_laws';


  // Foundation Subjects
  foundation_papa: string = '/papa'; // Principles and practice of accounting
  foundation_blaw = '/blaw'; // Business Law and Business Correspondance and Reporting
  foundation_bmath = '/bmath';
  foundation_beco = '/beco';

  // Intermediate Subjects
  tax_url: string = '/tax';
  intermediate_acc = '/acc';
  intermediate_claw = '/claw'; // Coprate & other Law
  intermediate_cmacc = '/cmacc'; // Cost and management accounting
  intermediate_aacc = '/aacc'; // advanced accounting
  intermediate_aass = '/aass'; // auditing and assurance
  intermediate_eisasm = '/eisasm'; // enterprise information system and strategic management
  intermediate_fmaecof = '/fmaecof'; // financial management and economics of finances

 // CA Final
 dt_url: string = '/dt'; // Direct tax law and international taxation
 idt_url: string = '/idt'; // Indirect tax laws
 final_fr = '/fr'; // financial reporting
 final_sfm = '/sfm'; // strategic financial management
 final_aaudit = '/aaudit'; // advanced auditing and proffessional ethics
 final_celaw = '/celaw'; // corporate and economics law
 final_scmpe = '/scmpe'; // strategic cost management and performance evaluation
 final_risk = '/risk'; // risk management
 final_fscm = '/fscm'; // financial service and capital market
 final_intax = '/intax'; // international taxation
 final_ecolaw = '/ecolaw'; // economics laws
 final_gfrs = '/ecolaw'; // global financial reporting standards
 final_multi = '/multi'; // multidisciplinary case study


}
