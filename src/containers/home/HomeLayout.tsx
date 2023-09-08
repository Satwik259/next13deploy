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
  Button,
  Flex,
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

  // State to store form data for each step
  const [formData, setFormData] = useState({
    requisitionDetails: {} as IRequisitionDetails,
    jobDetails: {} as IJobDetails,
    interviewSettings: {} as IInterViewSettings,
  });

  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber);
  };

  const handlePrevious = () => {
    // Handle going back to the previous step and populate form fields
    if (page > 0) {
      setPage((page - 1) as PageNumbers);
    }
  };

  const handleRequisitionDetails = (data: IRequisitionDetails) => {
    setFormData((prevData) => ({
      ...prevData,
      requisitionDetails: data,
    }));
  };

  const handleJobDetails = (data: IJobDetails) => {
    setFormData((prevData) => ({
      ...prevData,
      jobDetails: data,
    }));
  };

  const handleInterviewSettings = (data: IInterViewSettings) => {
    setFormData((prevData) => ({
      ...prevData,
      interviewSettings: data,
    }));
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
                  onChange={handleRequisitionDetails}
                  onSubmit={handleRequisitionDetails}
                  formData={formData.requisitionDetails}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleTab={handlePage}
                  onSubmit={handleJobDetails}
                  onChange={handleJobDetails}
                  formData={formData.jobDetails}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handleTab={handlePage}
                  onSubmit={handleInterviewSettings}
                  onChange={handleInterviewSettings}
                  formData={formData.interviewSettings}
                />
              </TabPanel>
            </TabPanels>
            <PreviewCard
              requisitionDetails={formData.requisitionDetails}
              jobDetails={formData.jobDetails}
              interviewSettings={formData.interviewSettings}
            />
          </Grid>
        </Tabs>
        <Flex justify="space-between" mt="2rem">
          {page > 0 && (
            <Button colorScheme="blue" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {page < 2 && (
            <Button
              colorScheme="blue"
              onClick={() => handlePage((page + 1) as PageNumbers)}
            >
              Next
            </Button>
          )}
          {page === 2 && (
            <Button colorScheme="green" onClick={() => alert("Form submitted")}>
              Submit
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default HomeLayout;
