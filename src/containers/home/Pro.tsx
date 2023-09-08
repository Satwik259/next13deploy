import React, { useState } from "react";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Grid,
  TabProps,
} from "@chakra-ui/react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import PreviewCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import {
  IRequisitionDetails,
  IJobDetails,
  IInterViewSettings,
} from "../../interface/forms";

const HomeLayout: React.FC = () => {
  const [page, setPage] = useState<PageNumbers>(0);

  const [requisitionDetails, setRequisitionDetails] =
    useState<IRequisitionDetails>({} as IRequisitionDetails);
  const [jobDetails, setJobDetails] = useState<IJobDetails>({} as IJobDetails);
  const [interviewSettings, setInterviewSettings] =
    useState<IInterViewSettings>({} as IInterViewSettings);

  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber);
  };

  const handleRequisitionDetails = (data: IRequisitionDetails) => {
    setRequisitionDetails(data);
  };

  const handleJobDetails = (data: IJobDetails) => {
    setJobDetails(data);
  };

  const handleInterviewSettings = (data: IInterViewSettings) => {
    setInterviewSettings(data);
  };

  const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
    return (
      <Tab p="1rem" fontFamily="Poppins" {...props}>
        {children}
      </Tab>
    );
  };
  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requisition Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  handleTab={handlePage}
                  onSubmit={handleRequisitionDetails}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleTab={handlePage}
                  onSubmit={handleJobDetails}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handleTab={handlePage}
                  onSubmit={handleInterviewSettings}
                />
              </TabPanel>
            </TabPanels>
            <PreviewCard
              requisitionDetails={requisitionDetails}
              jobDetails={jobDetails}
              interviewSettings={interviewSettings}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
