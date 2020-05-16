package com.piggymetrics.account.archunit;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.library.Architectures;
import org.junit.Test;

import static com.tngtech.archunit.library.Architectures.layeredArchitecture;

public class ArchGuardingTest {
    @Test
    public void testLayeredArchGuarding() {
        JavaClasses importedClasses = new ClassFileImporter().importPackages("com.piggymetrics.account");

        Architectures.LayeredArchitecture architecture = layeredArchitecture()
                .layer("facade").definedBy("..facade..")
                .layer("application").definedBy("..application..")
                .layer("domain").definedBy("..domain..")
                .whereLayer("facade").mayNotBeAccessedByAnyLayer()
                .whereLayer("application").mayOnlyBeAccessedByLayers("facade")
                .whereLayer("domain").mayOnlyBeAccessedByLayers("application", "facade");

        architecture.check(importedClasses);
    }
}
