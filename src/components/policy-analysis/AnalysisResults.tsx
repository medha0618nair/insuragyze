import React, { useState } from 'react';
import { Check, FileText, AlertCircle, CheckCircle, Info, ArrowDown, ArrowUp, Code, FileQuestion, List, FileBarChart, Clock, CreditCard, Phone, Calendar, FileSearch } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { PolicyAnalysisResult } from '@/services/policyService';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface AnalysisResultsProps {
  result: PolicyAnalysisResult;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onReset }) => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    simplified: true,
    coverage: true,
    exclusions: true,
    benefits: true,
    loopholes: true,
    deductibles: false,
    recommendations: true,
    rawData: false,
    detailedAnalysis: true,
    policyDetails: true,
    premiumInfo: false,
    claimsProcess: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your policy summary is downloading",
    });
  };

  const formatINR = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const simplifiedSummary = result.simplifiedSummary || 
    (result.rawApiResponse && (result.rawApiResponse as any).simplified_summary) ||
    "Your policy has been analyzed and the key points have been extracted. Please review the coverage highlights, benefits, exclusions, and recommendations below.";

  const policyFilename = result.rawApiResponse && (result.rawApiResponse as any).filename 
    ? (result.rawApiResponse as any).filename 
    : "Uploaded Document";

  const getAllBenefits = () => {
    let allBenefits = [...(result.benefits || [])];
    
    if (result.analysis?.benefits) {
      if (result.analysis.benefits["Medical Benefits"]) {
        allBenefits = [...allBenefits, ...result.analysis.benefits["Medical Benefits"]];
      }
      if (result.analysis.benefits["Financial Benefits"]) {
        allBenefits = [...allBenefits, ...result.analysis.benefits["Financial Benefits"]];
      }
      if (result.analysis.benefits["Additional Benefits"]) {
        allBenefits = [...allBenefits, ...result.analysis.benefits["Additional Benefits"]];
      }
    }
    
    return [...new Set(allBenefits)];
  };

  const getAllExclusions = () => {
    let allExclusions = [...(result.exclusions || [])];
    
    if (result.analysis?.major_exclusions) {
      allExclusions = [...allExclusions, ...result.analysis.major_exclusions];
    }
    
    return [...new Set(allExclusions)];
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <Alert className="bg-green-900/20 border border-green-500/30 text-white">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <AlertTitle className="text-white">Analysis Complete</AlertTitle>
        <AlertDescription className="text-gray-300">
          We've analyzed your policy document "{policyFilename}" and simplified the key terms and conditions.
        </AlertDescription>
      </Alert>
      
      <Card className="bg-black/50 border border-gray-800 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-insura-neon/30 to-insura-purple/30 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">{result.policyName || "Policy Summary"}</CardTitle>
              <CardDescription className="text-gray-300">{result.providerName || "Insurance Policy"}</CardDescription>
            </div>
            {result.policyNumber && (
              <Badge className="bg-insura-neon/20 text-insura-neon border border-insura-neon/30">
                Policy #{result.policyNumber}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('simplified')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <FileQuestion className="w-5 h-5 mr-2" /> Simplified Policy Summary
              </h3>
              {expandedSections.simplified ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.simplified && (
              <Card className="bg-black/30 border border-insura-purple/30">
                <CardContent className="p-4">
                  <div className="bg-gradient-to-r from-insura-neon/10 to-insura-purple/10 p-4 rounded-lg text-gray-200">
                    {simplifiedSummary}
                  </div>
                  
                  {result.additionalInformation && result.additionalInformation.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-semibold text-white">Additional Information</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {result.additionalInformation.map((info, index) => (
                          <li key={index} className="text-gray-300 text-sm">{info}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('policyDetails')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <FileSearch className="w-5 h-5 mr-2" /> Policy Details
              </h3>
              {expandedSections.policyDetails ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.policyDetails && (
              <Card className="bg-black/30 border border-insura-purple/30">
                <CardContent className="p-4">
                  <Table>
                    <TableBody>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-400 font-medium">Insurer</TableCell>
                        <TableCell className="text-white">{result.providerName || "Not specified"}</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-400 font-medium">Policy Number</TableCell>
                        <TableCell className="text-white">{result.policyNumber || "Not available"}</TableCell>
                      </TableRow>
                      {result.policyDetails?.issueDate && (
                        <TableRow className="border-gray-800">
                          <TableCell className="text-gray-400 font-medium">Issue Date</TableCell>
                          <TableCell className="text-white">{result.policyDetails.issueDate}</TableCell>
                        </TableRow>
                      )}
                      {result.policyDetails?.expiryDate && (
                        <TableRow className="border-gray-800">
                          <TableCell className="text-gray-400 font-medium">Expiry Date</TableCell>
                          <TableCell className="text-white">{result.policyDetails.expiryDate}</TableCell>
                        </TableRow>
                      )}
                      {result.policyDetails?.insurerContact && (
                        <TableRow className="border-gray-800">
                          <TableCell className="text-gray-400 font-medium">Insurer Contact</TableCell>
                          <TableCell className="text-white">{result.policyDetails.insurerContact}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>

          {result.premiumInfo && (result.premiumInfo.amount || result.premiumInfo.frequency) && (
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => toggleSection('premiumInfo')}
              >
                <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" /> Premium Information
                </h3>
                {expandedSections.premiumInfo ? 
                  <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                  <ArrowDown className="w-5 h-5 text-gray-400" />
                }
              </div>
              
              {expandedSections.premiumInfo && (
                <Card className="bg-black/30 border border-insura-purple/30">
                  <CardContent className="p-4">
                    <Table>
                      <TableBody>
                        {result.premiumInfo.amount && (
                          <TableRow className="border-gray-800">
                            <TableCell className="text-gray-400 font-medium">Premium Amount</TableCell>
                            <TableCell className="text-white">{result.premiumInfo.amount}</TableCell>
                          </TableRow>
                        )}
                        {result.premiumInfo.frequency && (
                          <TableRow className="border-gray-800">
                            <TableCell className="text-gray-400 font-medium">Payment Frequency</TableCell>
                            <TableCell className="text-white">{result.premiumInfo.frequency}</TableCell>
                          </TableRow>
                        )}
                        {result.premiumInfo.dueDates && (
                          <TableRow className="border-gray-800">
                            <TableCell className="text-gray-400 font-medium">Due Dates</TableCell>
                            <TableCell className="text-white">{result.premiumInfo.dueDates}</TableCell>
                          </TableRow>
                        )}
                        {result.premiumInfo.gracePeriod && (
                          <TableRow className="border-gray-800">
                            <TableCell className="text-gray-400 font-medium">Grace Period</TableCell>
                            <TableCell className="text-white">{result.premiumInfo.gracePeriod}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {result.claimsProcess && (
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => toggleSection('claimsProcess')}
              >
                <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                  <FileBarChart className="w-5 h-5 mr-2" /> Claims Process
                </h3>
                {expandedSections.claimsProcess ? 
                  <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                  <ArrowDown className="w-5 h-5 text-gray-400" />
                }
              </div>
              
              {expandedSections.claimsProcess && (
                <Card className="bg-black/30 border border-insura-purple/30">
                  <CardContent className="p-4 space-y-4">
                    {result.claimsProcess.steps && result.claimsProcess.steps.length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-white mb-2">Claim Steps</h4>
                        <ol className="list-decimal pl-5 space-y-1">
                          {result.claimsProcess.steps.map((step, index) => (
                            <li key={index} className="text-gray-300">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
                    {result.claimsProcess.documents && result.claimsProcess.documents.length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold text-white mb-2">Required Documents</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {result.claimsProcess.documents.map((doc, index) => (
                            <li key={index} className="text-gray-300">{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {result.claimsProcess.timeframe && (
                      <div>
                        <h4 className="text-md font-semibold text-white mb-2">Timeframe</h4>
                        <p className="text-gray-300">{result.claimsProcess.timeframe}</p>
                      </div>
                    )}
                    
                    {result.claimsProcess.contact && (
                      <div>
                        <h4 className="text-md font-semibold text-white mb-2">Contact for Claims</h4>
                        <p className="text-gray-300">{result.claimsProcess.contact}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {result.analysis && (
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => toggleSection('detailedAnalysis')}
              >
                <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                  <List className="w-5 h-5 mr-2" /> Detailed Analysis
                </h3>
                {expandedSections.detailedAnalysis ? 
                  <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                  <ArrowDown className="w-5 h-5 text-gray-400" />
                }
              </div>
              
              {expandedSections.detailedAnalysis && (
                <Card className="bg-black/30 border border-insura-purple/30">
                  <CardContent className="p-4 space-y-4">
                    {getAllBenefits().length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-md font-semibold text-insura-neon">Key Benefits</h4>
                        <ul className="space-y-2">
                          {getAllBenefits().map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Separator className="border-gray-800" />
                      </div>
                    )}
                    
                    {result.analysis.benefits && (
                      <div className="space-y-3">
                        <h4 className="text-md font-semibold text-insura-neon">Benefits by Category</h4>
                        
                        {result.analysis.benefits["Medical Benefits"] && result.analysis.benefits["Medical Benefits"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Medical Benefits</h5>
                            <ul className="space-y-2">
                              {result.analysis.benefits["Medical Benefits"].map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.analysis.benefits["Financial Benefits"] && result.analysis.benefits["Financial Benefits"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Financial Benefits</h5>
                            <ul className="space-y-2">
                              {result.analysis.benefits["Financial Benefits"].map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.analysis.benefits["Additional Benefits"] && result.analysis.benefits["Additional Benefits"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Additional Benefits</h5>
                            <ul className="space-y-2">
                              {result.analysis.benefits["Additional Benefits"].map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Separator className="border-gray-800" />
                      </div>
                    )}
                    
                    {result.analysis.major_exclusions && result.analysis.major_exclusions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-md font-semibold text-insura-neon">Major Exclusions</h4>
                        <ul className="space-y-2">
                          {result.analysis.major_exclusions.map((exclusion, index) => (
                            <li key={index} className="flex items-start">
                              <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{exclusion}</span>
                            </li>
                          ))}
                        </ul>
                        <Separator className="border-gray-800" />
                      </div>
                    )}
                    
                    {result.analysis.loopholes && (
                      <div className="space-y-3">
                        <h4 className="text-md font-semibold text-insura-neon">Potential Loopholes</h4>
                        
                        {result.analysis.loopholes["Ambiguous Language"] && result.analysis.loopholes["Ambiguous Language"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Ambiguous Language</h5>
                            <ul className="space-y-2">
                              {result.analysis.loopholes["Ambiguous Language"].slice(0, 5).map((loophole, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{loophole}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.analysis.loopholes["Exclusion Clauses"] && result.analysis.loopholes["Exclusion Clauses"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Exclusion Clauses</h5>
                            <ul className="space-y-2">
                              {result.analysis.loopholes["Exclusion Clauses"].map((loophole, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{loophole}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.analysis.loopholes["Limitation Flags"] && result.analysis.loopholes["Limitation Flags"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Limitation Flags</h5>
                            <ul className="space-y-2">
                              {result.analysis.loopholes["Limitation Flags"].map((loophole, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{loophole}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {result.analysis.loopholes["Claim Rejection Risks"] && result.analysis.loopholes["Claim Rejection Risks"].length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-white">Claim Rejection Risks</h5>
                            <ul className="space-y-2">
                              {result.analysis.loopholes["Claim Rejection Risks"].map((loophole, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{loophole}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('coverage')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> Coverage Highlights
              </h3>
              {expandedSections.coverage ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.coverage && (
              <Card className="bg-black/30 border border-gray-800">
                <CardContent className="p-4">
                  <Table>
                    <TableHeader className="bg-black/30">
                      <TableRow className="border-gray-800">
                        <TableHead className="text-insura-neon">Coverage Type</TableHead>
                        <TableHead className="text-insura-neon text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-300">Home Structure</TableCell>
                        <TableCell className="text-right text-white font-medium">
                          {formatINR(result.summary.coverageAmount)}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-300">Personal Property</TableCell>
                        <TableCell className="text-right text-white font-medium">
                          {formatINR(result.summary.personalProperty)}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-300">Liability Protection</TableCell>
                        <TableCell className="text-right text-white font-medium">
                          {formatINR(result.summary.liability)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 space-y-2">
                    {result.summary.waterDamageCovered && (
                      <div className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Water damage from plumbing issues is covered
                      </div>
                    )}
                    {result.summary.theftCovered && (
                      <div className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        Theft and vandalism are covered
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('benefits')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> All Benefits
              </h3>
              {expandedSections.benefits ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.benefits && (
              <Card className="bg-black/30 border border-gray-800">
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {getAllBenefits().map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('exclusions')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" /> All Exclusions
              </h3>
              {expandedSections.exclusions ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.exclusions && (
              <Card className="bg-black/30 border border-gray-800">
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {getAllExclusions().map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('loopholes')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" /> Potential Loopholes & Important Considerations
              </h3>
              {expandedSections.loopholes ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.loopholes && (
              <Card className="bg-black/30 border border-gray-800">
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {result.loopholes?.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('deductibles')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <Info className="w-5 h-5 mr-2" /> Deductibles
              </h3>
              {expandedSections.deductibles ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.deductibles && (
              <Card className="bg-black/30 border border-gray-800">
                <CardContent className="p-4">
                  <Table>
                    <TableHeader className="bg-black/30">
                      <TableRow className="border-gray-800">
                        <TableHead className="text-insura-neon">Type</TableHead>
                        <TableHead className="text-insura-neon text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-300">Standard Deductible</TableCell>
                        <TableCell className="text-right text-white font-medium">
                          {typeof result.deductibles.standard === 'number' ? 
                            formatINR(result.deductibles.standard) : 
                            result.deductibles.standard}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-gray-800">
                        <TableCell className="text-gray-300">Wind/Hail Deductible</TableCell>
                        <TableCell className="text-right text-white font-medium">
                          {result.deductibles.windHail}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => toggleSection('rawData')}
            >
              <h3 className="text-lg font-semibold text-insura-neon flex items-center">
                <Code className="w-5 h-5 mr-2" /> Raw API Response
              </h3>
              {expandedSections.rawData ? 
                <ArrowUp className="w-5 h-5 text-gray-400" /> : 
                <ArrowDown className="w-5 h-5 text-gray-400" />
              }
            </div>
            
            {expandedSections.rawData && (
              <Card className="bg-black/30 border border-gray-800">
                <CardContent className="p-4">
                  <pre className="bg-black/50 p-4 rounded overflow-auto text-xs text-gray-300 max-h-96">
                    {result.rawApiResponse ? JSON.stringify(result.rawApiResponse, null, 2) : 'No raw data available'}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => toggleSection('recommendations')}
        >
          <h3 className="text-lg font-semibold text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-insura-neon" /> AI Recommendations
          </h3>
          {expandedSections.recommendations ? 
            <ArrowUp className="w-5 h-5 text-gray-400" /> : 
            <ArrowDown className="w-5 h-5 text-gray-400" />
          }
        </div>
        
        {expandedSections.recommendations && (
          <Card className="bg-gradient-to-b from-insura-neon to-insura-purple border border-insura-neon/20 shadow-lg">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {result.recommendations.map((rec: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                      rec.type === 'warning' ? 'bg-yellow-900/30 text-yellow-500' :
                      rec.type === 'success' ? 'bg-green-900/30 text-green-500' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {rec.type === 'warning' ? (
                        <AlertCircle className="h-5 w-5" />
                      ) : rec.type === 'success' ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">{rec.title}</p>
                      <p className="text-gray-300">{rec.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <ButtonCustom
          variant="primary"
          size="lg"
          className="bg-gradient-to-r from-insura-neon to-insura-purple"
          onClick={handleDownload}
        >
          Download Summary
        </ButtonCustom>
        
        <ButtonCustom
          variant="outline"
          size="lg"
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
          onClick={onReset}
        >
          Analyze Another Document
        </ButtonCustom>
      </div>
    </div>
  );
};

export default AnalysisResults;
