package tn.esprit.manajero.Services;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tn.esprit.manajero.Entities.Methode;
import tn.esprit.manajero.ManajeroApplication;
import tn.esprit.manajero.Repositories.MethodeRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;

@SpringBootTest(classes = ManajeroApplication.class)
@Slf4j
public class MethodeServiceTest {

    @Autowired
    private MethodeRepository methodeRepository;

    @Autowired
    private MethodeService service;


    @BeforeEach
    public void setUp() {
        // Clear the repository before each test
        methodeRepository.deleteAll();
    }


    @Test
    public void addMethodeWithSuccess() {
        log.info("Starting test for addMethodeWithSuccess");

        Methode expectedMethod = Methode.builder()
                .Introduction("Introduction test")
                .why("Why test")
                .what("What test")
                .how("How test")
                .whatif("WhatIf test")
                .Advantages("Advantages test")
                .conclusion("Conclusion test")
                .build();

        log.info("Methode object created: {}", expectedMethod);

        Methode savedMethod = service.addMethode(expectedMethod);

        log.info("Methode returned from service: {}", savedMethod);

        assertNotNull(savedMethod, "The saved method should not be null");
        assertNotNull(savedMethod.getId(), "The saved method ID should not be null");

        assertEquals(expectedMethod.getIntroduction(), savedMethod.getIntroduction(), "Introduction does not match");
        assertEquals(expectedMethod.getWhy(), savedMethod.getWhy(), "Why does not match");
        assertEquals(expectedMethod.getWhat(), savedMethod.getWhat(), "What does not match");
        assertEquals(expectedMethod.getHow(), savedMethod.getHow(), "How does not match");
        assertEquals(expectedMethod.getWhatif(), savedMethod.getWhatif(), "WhatIf does not match");
        assertEquals(expectedMethod.getAdvantages(), savedMethod.getAdvantages(), "Advantages do not match");
        assertEquals(expectedMethod.getConclusion(), savedMethod.getConclusion(), "Conclusion does not match");

        log.info("Test addMethodeWithSuccess passed successfully!");
    }


    @Test
    public void getAllMethodsShouldReturnAllMethods() {
        log.info("Starting test for getAllMethodsShouldReturnAllMethods");

        // Arrange: Add some methods to the repository
        Methode method1 = Methode.builder()
                .Introduction("Intro 1")
                .why("Why 1")
                .what("What 1")
                .how("How 1")
                .whatif("WhatIf 1")
                .Advantages("Advantages 1")
                .conclusion("Conclusion 1")
                .build();

        Methode method2 = Methode.builder()
                .Introduction("Intro 2")
                .why("Why 2")
                .what("What 2")
                .how("How 2")
                .whatif("WhatIf 2")
                .Advantages("Advantages 2")
                .conclusion("Conclusion 2")
                .build();

        methodeRepository.save(method1);
        methodeRepository.save(method2);

        // Act: Retrieve all methods from the service
        List<Methode> methods = service.getAllMethods();

        // Assert: Verify the methods are correctly retrieved
        assertNotNull(methods, "The list of methods should not be null");
        assertEquals(2, methods.size(), "The list of methods size should be 2");

        assertEquals(method1.getIntroduction(), methods.get(0).getIntroduction(), "The Introduction of the first method does not match");
        assertEquals(method2.getIntroduction(), methods.get(1).getIntroduction(), "The Introduction of the second method does not match");

        // Log success message
        log.info("Test getAllMethodsShouldReturnAllMethods passed successfully!");
    }


    @Test
    public void getMethodeByIdShouldReturnCorrectMethode() {
        log.info("Starting test for getMethodeByIdShouldReturnCorrectMethode");

        // Arrange: Add a method to the repository
        Methode method = Methode.builder()
                .Introduction("Intro for ID Test")
                .why("Why for ID Test")
                .what("What for ID Test")
                .how("How for ID Test")
                .whatif("WhatIf for ID Test")
                .Advantages("Advantages for ID Test")
                .conclusion("Conclusion for ID Test")
                .build();

        Methode savedMethod = methodeRepository.save(method);

        // Act: Retrieve the method by its ID
        Methode retrievedMethod = service.getMethodeById(savedMethod.getId());

        // Assert: Verify the method is correctly retrieved
        assertNotNull(retrievedMethod, "The retrieved method should not be null");
        assertEquals(savedMethod.getId(), retrievedMethod.getId(), "The ID of the retrieved method should match the saved method");
        assertEquals(savedMethod.getIntroduction(), retrievedMethod.getIntroduction(), "The Introduction does not match");
        assertEquals(savedMethod.getWhy(), retrievedMethod.getWhy(), "The Why does not match");
        assertEquals(savedMethod.getWhat(), retrievedMethod.getWhat(), "The What does not match");
        assertEquals(savedMethod.getHow(), retrievedMethod.getHow(), "The How does not match");
        assertEquals(savedMethod.getWhatif(), retrievedMethod.getWhatif(), "The WhatIf does not match");
        assertEquals(savedMethod.getAdvantages(), retrievedMethod.getAdvantages(), "The Advantages do not match");
        assertEquals(savedMethod.getConclusion(), retrievedMethod.getConclusion(), "The Conclusion does not match");

        // Log success message
        log.info("Test getMethodeByIdShouldReturnCorrectMethode passed successfully!");
    }



    @Test
    public void deleteMethodeShouldRemoveMethode() {
        log.info("Starting test for deleteMethodeShouldRemoveMethode");

        // Arrange: Add a method to the repository
        Methode method = Methode.builder()
                .Introduction("Intro for Delete Test")
                .why("Why for Delete Test")
                .what("What for Delete Test")
                .how("How for Delete Test")
                .whatif("WhatIf for Delete Test")
                .Advantages("Advantages for Delete Test")
                .conclusion("Conclusion for Delete Test")
                .build();

        Methode savedMethod = methodeRepository.save(method);

        // Act: Delete the method by its ID
        service.deleteMethode(savedMethod.getId());

        // Assert: Verify the method is no longer in the repository
        assertFalse(methodeRepository.findById(savedMethod.getId()).isPresent(), "The method should be deleted and no longer present in the repository");

        // Log success message
        log.info("Test deleteMethodeShouldRemoveMethode passed successfully!");
    }


    @Test
    public void updateMethodeShouldUpdateExistingMethode() {
        log.info("Starting test for updateMethodeShouldUpdateExistingMethode");

        // Arrange: Add a method to the repository
        Methode originalMethod = Methode.builder()
                .Introduction("Original Intro")
                .why("Original Why")
                .what("Original What")
                .how("Original How")
                .whatif("Original WhatIf")
                .Advantages("Original Advantages")
                .conclusion("Original Conclusion")
                .build();

        Methode savedMethod = methodeRepository.save(originalMethod);

        // Prepare the updated data
        Methode updatedMethod = Methode.builder()
                .Introduction("Updated Intro")
                .Advantages("Updated Advantages")
                .how("Updated How")
                .build();

        // Act: Update the method by its ID
        Methode resultMethod = service.updateMethode(savedMethod.getId(), updatedMethod);

        // Assert: Verify the method was updated correctly
        assertNotNull(resultMethod, "The result method should not be null");
        assertEquals(savedMethod.getId(), resultMethod.getId(), "The ID of the updated method should match the original method");

        // Check that the updated fields are changed
        assertEquals("Updated Intro", resultMethod.getIntroduction(), "The Introduction should be updated");
        assertEquals("Updated Advantages", resultMethod.getAdvantages(), "The Advantages should be updated");
        assertEquals("Updated How", resultMethod.getHow(), "The How should be updated");

        // Check that the unchanged fields remain the same
        assertEquals("Original Why", resultMethod.getWhy(), "The Why should remain unchanged");
        assertEquals("Original What", resultMethod.getWhat(), "The What should remain unchanged");
        assertEquals("Original WhatIf", resultMethod.getWhatif(), "The WhatIf should remain unchanged");
        assertEquals("Original Conclusion", resultMethod.getConclusion(), "The Conclusion should remain unchanged");

        // Log success message
        log.info("Test updateMethodeShouldUpdateExistingMethode passed successfully!");
    }






















}
