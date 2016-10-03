

    angular.module('ComplaintForm').controller('complaintFrmCtrl', ['$scope', '$modal', '$http', '$log',

    function($scope, $modal, $http, $log) {
        var vm = this;
        vm.previewForm = previewForm;
        vm.resetForm = resetForm;
        vm.openModal = openModal;
       
        $scope.receivedDate = new Date();
        $scope.AcknowledgDate = new Date();
        $scope.ClosedDate = new Date();
        $scope.minDate = new Date(

            $scope.receivedDate.getFullYear() - 50,
            $scope.receivedDate.getMonth() - 2,
            $scope.receivedDate.getDate());
        
        $scope.maxDate = new Date();

        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }


        $scope.sourceCategory = {
            'Agency complaints': [
                'Attorneys General',
                'Better Business Bureau',
                'Congressional Office',
                'Consumer Financial Protection Bureau',
                'Financial Industry Regulatory Authority',
                'Office of the Comptroller of the Currency',
                'Securities and Exchange Commission',
                'State Banking/ Regulatory Agency',
                'Department of Justice',
                'Department of Education',
                'Department of Insurance',
                'State Elected Official',
                'International Agencies',
                'Other Agencies'

            ],
            'Third party service provider complaints': [],

            'Social media complaints': [
                'Facebook',
                'Google+',
                'Instagram',
                'LinkedIn',
                'Pinterest',
                'Tumblr',
                'Twitter',
                'Yelp',
                'YouTube',
                'Wells Fargo Sponsored Blog',
                'Other Social Media'
            ]
        };

        $scope.productCategory = {
            'Mortgage/Home Equity': [
                'Conventional Mortgage',
                'FHA Mortgage',
                'Home Equity',
                'Reverse Mortgage',
                'VA Mortgage'
            ],
            'Consumer Loan': [
                'Affinity Partner',
                'FFELP',
                'Personal Lines and Loans',
                'Student Loan Private',
                'Student Loan Private Consolidation',
                'WFF Installment Loan',
                'WFF LOC'
            ],
            'Deposit/Money Movement': [
                'ACH',
                'ATM/Debit Card',
                'Cash Vault',
                'Cashier’s Check/Money Order',
                'Certificate of Deposit',
                'Checking',
                'ExpressSend',
                'Health Savings Account',
                'Identity Theft Protection',
                'Individual Retirement Account',
                'Lockbox',
                'Merchant Services',
                'Payroll',
                'Portfolio Management Account',
                'Prepaid/Gift Card',
                'Remote Deposit Capture',
                'Safe Deposit Box',
                'Savings',
                'Wire'
            ],
            'Credit Card': [
                'Business Elite Card',
                'Business Platinum Card',
                'Business Secured Credit Card',
                'By Invitation Visa Signature Card',
                'Cash Back Card',
                'Cash Back College Card',
                'Cash Back Visa Signature Card',
                'Commercial Card',
                'Dillard’s AMEX',
                'Dillard’s Private Label',
                'Home Rebate Card',
                'Home Rebate Visa Signature Card',
                'MasterCard',
                'Non-Prime Credit Card',
                'Platinum Card',
                'Propel 365 AMEX Card',
                'Propel World AMEX Card',
                'Rewards',
                'Rewards VISA Signature Card',
                'Secured Card',
                'VISA Signature Card'
            ],
            'Virtual Banking': [
                'Business Elite Card',
                'Business Platinum Card',
                'Business Secured Credit Card',
                'By Invitation Visa Signature Card',
                'Cash Back Card',
                'Cash Back College Card',
                'Cash Back Visa Signature Card',
                'Commercial Card',
                'Dillard’s AMEX',
                'Dillard’s Private Label',
                'Home Rebate Card',
                'Home Rebate Visa Signature Card',
                'MasterCard',
                'Non-Prime Credit Card',
                'Platinum Card',
                'Propel 365 AMEX Card',
                'Propel World AMEX Card',
                'Rewards',
                'Rewards VISA Signature Card',
                'Secured Card',
                'VISA Signature Card'
            ],
            'Retail Services': [],
            'Business/Commercial Loan': [
                'Business Line of Credit',
                'Business Loan',
                'Business Real-Estate Line/Loan',
                'Commercial Loan',
                'Commercial Line of Credit',
                'Commercial Real-Estate Loan',
                'Equipment Express',
                'Equipment Finance',
                'Letters of Credit',
                'SBA (7A & 504) Line/Loan',
                'Small Business Advantage (SBA) Line/Loan',
                'Structured Trade',
                'Trade Services'
            ],
            'Auto Loan': [
                'Auto Lease',
                'Aftermarket Product',
                'Direct Auto Loan',
                'Indirect Auto Loan',
                'Reliable'
            ],
            'Insurance': [
                'Agribusiness',
                'Auto/Specialty Vehicle',
                'Group Health',
                'Homeowners/Renters',
                'Individual',
                'Property/Causality',
                'Warranty'
            ],
            'Investment Management': [
                'Brokerage',
                'Corporate Trust Services',
                'Foreign Exchange',
                'Retirement',
                'Treasury Management',
                'Wells Fargo Financial',
                'WFAM - Wells Fargo Advantage Fund',
                'FINRA Products'
            ],
            'Not Product Related': [
                'Not Product Related'
            ]

        };

        $scope.primaryComplaintReasonCategory = {
            'Account Closing or Payoff': [
                'Deceased Customer',
                'Incorrect, Incomplete or Unexpected Closure',
                'PATRIOT Act Liquidation',
                'Payoff Amount',
                'Payoff Process',
                'Redemption'
            ],
            'Account Documents or Statements': [
                'Account Notices',
                'Documentation',
                'Failure to Provide Disclosures',
                'Photocopies',
                'Proxy or Prospectus',
                'Reported Account Balance',
                'Statement Confirms, Content, Processing or Receipt',
                'Tax Reporting or Documents'
            ],
            'Account Maintenance': [
                'Account Administration and Processing – Account Maintenance',
                'Account Administration and Processing',
                'Account Linkage',
                'Account Restriction or Prevention',
                'Action',
                'Account Titling',
                'Address Change',
                'Balance Confirmation or Debt Validation',
                'Check Order',
                'Claim Dispute/Decision (Non-Fraud)',
                'Collateral Process/Release',
                'Credit Line Increase or Decrease',
                'Deferment/Forbearance',
                'Due Date Change',
                'Eligibility to Remove Escrow',
                'Escheatment Issue',
                'Execution',
                'Flood Insurance Requirement',
                'Forced Place Insurance',
                'Forced Place Tax',
                'Hazard Insurance Requirement',
                'Incorrect or Incomplete Maintenance',
                'Loan Assumptions',
                'Maintenance Refusal or Denial',
                'Margin Problems',
                'Missing Account',
                'Other',
                'Overdraft Protection/Services',
                'PMI/MIP Requirement',
                'Pre-Funding Charge',
                'Provisional Credit',
                'Reopen Account Request',
                'Third Party Authorization or Authorization to Inquire',
                'Timeliness',
                'Unauthorized Account Maintenance'
            ],
            'Account Opening or Origination': [
                'Account Administration and Processing – Account Opening',
                'Account Titling',
                'Application Denied/Adverse Action',
                'Application Process',
                'Authentication or Identification',
                'Card Activation or Receipt',
                'Closing Costs',
                'Collateral Valuation',
                'Credit Decision/Limit',
                'Document Collection Process',
                'Escrow Requirements',
                'Incorrect or Incomplete Opening',
                'Interview or Application',
                'Loan Closing Process or Funding',
                'Product/Rate/Term',
                'Regulation B',
                'Terms and Conditions',
                'Unauthorized Account Opening',
                'Unauthorized Trading'
            ],
            'collections/Default': [
                'Account Closure Or Restriction',
                'Appropriate Title for Foreclosure',
                'Approved Short Sale Process and Title Clearing',
                'Bankruptcy – Application of Payments',
                'Bankruptcy – Filing or Discharge',
                'Bankruptcy – General',
                'Bankruptcy – Reaffirmation of Debt',
                'Cease and Desist',
                'Chargeoff',
                'Collection Practices',
                'Debt Validation',
                'Document Collection Process',
                'Final mod Settlement and Title Clearing or Subordination',
                'Forbearance or Workout Plans',
                'Foreclosure Efforts',
                'Foreclosure Notification',
                'Foreclosure Reinstatement',
                'Right of Offset',
                'Garnishment or Levy',
                'Legal Pursuit or Legal Remedies',
                'Posse or Stall of Foreclosure',
                'Property Damage, Theft or Securing Issues',
                'Property Maintenance',
                'Property Valuation',
                'Repossession',
                'Sold Account',
                'SPOC Problems',
                'Time in Process',
                'Trial Process',
                'Understanding or Disputing Decision'
            ],
            'Company': [
                'Physical Access to Facilities',
                'Auxiliary Aids/Services or Modification to Procedures',
                'Community Support',
                'Complaints Referred to Previous Employer',
                'Economic Solvency',
                'International Operations',
                'Litigation Involvement',
                'Media/News Coverage',
                'Merger or Acquisition Activity',
                'Miscellaneous (Firm Related Only)',
                'Miscellaneous (Non	Sales Practice Only)',
                'Non-Broker-Dealer Affiliate Activity',
                'Reorganization or Redemption',
                'Research',
                'Third Party or Anonymous'
            ],
            'Credit Reporting': [
                'Credit Inquiries',
                'Courtesy Correction Decline',
                'Credit Monitoring',
                'Completeness or Accuracy of Report'
            ],
            'Customer Service/Service Delivery': [
                'Account or Relationship Management Support',
                'Authentication or Identification',
                'Bank or Firm Policy',
                'Check Cashing Services',
                'Failure to Follow Instructions',
                'Language or Translation',
                'Location or Hours of Operation',
                'Service Issues',
                'Store Facility Interior of Exterior',
                'Team Member Behavior or Knowledge',
                'Wait Time/Multiple Transfers'
            ],
            'Fees and Pricing': [
                'Excess Wear and Tear Fees',
                'Exchange Rate or Fees',
                'Fee Assessment – Prop. Pres.',
                'Fees and Commissions',
                'Foreclosure Fees',
                'Interest Rate',
                'Late or Over Limit Fees',
                'Legal Remedy Fees',
                'NSF/OD Fees',
                'Origination Fees',
                'Recurring Fees',
                'Repossession Fees',
                'Service Fees or Charges',
                'Special Terms Interest Accrual'
            ],
            'Marketing and Sales Practices': [
                'Communication with Public',
                'Excessive Trading',
                'Failure to Supervise',
                'Managed Accounts',
                'Marketing, Sales Material or Advertisements',
                'Marketing/Sales Literature',
                'Miscellaneous (Sales Practice Only)',
                'Misrepresentation',
                'Point Structure or Merchandise Selection',
                'Poor Performance',
                'Poor Recommendation or Poor Advice',
                'Product Feature or Characteristic',
                'Product Origination/Investment Banking',
                'Promotions or Incentives',
                'Sales Tactics',
                'Selling Away',
                'Solicitation',
                'Suitability',
                'Trading'
            ],
            'Payments/Processing/Money Movement': [
                'ACH, EFT, or Auto Draft',
                'Application of Final Payment',
                'ATM or POS Transaction',
                'Cash Advance',
                'Deposit or Payment Hold',
                'Dividend and Interest Problems',
                'In Store Payment',
                'Insurance Claim Payout Process (Loss Draft)',
                'Insurance Payment',
                'Missing Deposit',
                'Overpayment Refund',
                'Payment Application or Missing Payment',
                'Payment Change',
                'Payment Processing',
                'Posting and Cut-Off Times',
                'Posting Order',
                'Property Tax/Tax Payment',
                'Receipt or Delivery or Funds',
                'Receipt or Delivery of Securities',
                'Regulation E',
                'Remittance Transfer Issues',
                'Returned Check or Payment',
                'Reverse Mortgage Payment Disbursements',
                'Shortage, Overage Escrow or Payment Change',
                'Stop Payment',
                'Transfer or Account Balances'
            ],
            'Security/Fraud': [
                'Claim Dispute/Decision (Fraud)',
                'Identity Theft',
                'Investigation, Process or Timeframe',
                'Lack of Fraud Notification',
                'Lost or Stolen Item',
                'Misappropriation or Forgery',
                'Other Theft/Forgery',
                'Outside Business Activity',
                'Phishing',
                'Physical Security',
                'Privacy or Information Security',
                'Regulation S-P'
            ],
            'Virtual Banking': [
                'Account Availability',
                'Alerts or Notifications',
                'Application Process or Submissions',
                'Bill Pay Issues',
                'Document Viewing Problems',
                'Navigation and Ease of Use',
                'On-Line Issues',
                'On-Line Trading',
                'Real Time Updates'
            ]

        }



        function previewForm() {



            if ($scope.complaintFormthirdParty.$valid) {

            } else {
                $scope.submitted = true;
            }
            console.log($scope.complaintFormthirdParty.$invalid && $scope.submitted);
            //
            //if ($scope.AcknowledgDate >= $scope.receivedDate && $scope.AcknowledgDate <= $scope.ClosedDate && $scope.ClosedDate >= $scope.receivedDate) {
            //    // console.log("receivedDate",$scope.receivedDate);
            //    // console.log("AcknowledgDate", $scope.AcknowledgDate);
            //    $scope.recievederror = false;
            //
            //} else {
            //    $scope.recievederror = true;
            //}

            if ($scope.receivedDate <= $scope.AcknowledgDate) {
                $scope.acknowledgDateerror = false;
            } else {
                $scope.acknowledgDateerror = true;
            }
            if ($scope.AcknowledgDate <= $scope.ClosedDate && $scope.receivedDate <= $scope.ClosedDate) {
                $scope.closedDateerror = false;
            } else {
                $scope.closedDateerror = true;
            }
           //$scope.dev = $scope.submitted && $scope.complaintFormthirdParty.receivedDate.$invalid;


        }

        function resetForm() {
            /////
        }
        function openModal() {

            // $scope.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'modalTemplate.html',
                controller: ModalInstanceCtrl,
                windowClass: 'complaint-form-modal',
                resolve: {
                    items: function() {
                        return  $scope.modalvalue;
                    }
                }
            }).result.then(function (result) {
                $scope.modalvalue=result;
            });
            // modalInstance.result.then(function () {
            // }, function () {
            //   $log.info('Modal dismissed at: ' + new Date());
            // });
            // };
        };
        var ModalInstanceCtrl = function($scope, $modalInstance, $http,items) {

            console.log(items,"from modal")

            $http.get('vendor/package.json').then(function(response){
                $scope.selectValues=response.data.selectValues;
                for(var i=0;i<$scope.selectValues.length;i++)
                {
                    if(items != undefined) {
                        for (var j = 0; j < items.length; j++)
                            if ($scope.selectValues[i].value == items[j]) {
                                console.log($scope.selectValues[i].value, items[j]);
                                $scope.selectValues[i].checked = true;
                            }
                    }
                }

            });

            $scope.select=[];

            console.log($scope.select,"frmo modal");
            $scope.selectedValue=function(selected,popup_values){
                console.log(popup_values.value);
                if(popup_values.checked==true){
                    $scope.select.push(popup_values.value);
                }

                console.log($scope.select);

            }

            $scope.ok = function() {
                $modalInstance.close($scope.select);
            };
            $scope.cancel = function() {
                $modalInstance.dismiss();
            };
        };
    }
    ]);