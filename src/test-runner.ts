// Test runner to validate all analyzer functionality
import { AngularAnalyzer } from './AngularAnalyzer.js';
import { ImportAnalyzer } from './analyzers/ImportAnalyzer.js';
import { ServiceUsageAnalyzer } from './analyzers/ServiceUsageAnalyzer.js';
import { ReportGenerator } from './analyzers/ReportGenerator.js';

async function runValidationTests() {
    console.log('🧪 Running Angular Analyzer Validation Tests...\n');
    
    let passedTests = 0;
    let totalTests = 0;

    function test(name: string, assertion: boolean) {
        totalTests++;
        if (assertion) {
            console.log(`✅ ${name}`);
            passedTests++;
        } else {
            console.log(`❌ ${name}`);
        }
    }

    try {
        // Test 1: Basic analyzer instantiation
        const analyzer = new AngularAnalyzer();
        test("AngularAnalyzer instantiation", analyzer !== undefined);

        // Test 2: Analyze sample files
        const results = await analyzer.analyze();
        test("Analysis completes without errors", results !== undefined);

        // Test 3: Check that results contain expected component
        const hasAddressEditComponent = 'AddressEditComponent' in results;
        test("Finds AddressEditComponent", hasAddressEditComponent);

        if (hasAddressEditComponent) {
            const component = results.AddressEditComponent;
            
            // Test 4: Component has file path
            test("Component has file path", component.file !== undefined);
            
            // Test 5: Component has services
            test("Component has services", Object.keys(component.services).length > 0);
            
            // Test 6: CountriesService is detected
            test("CountriesService detected", 'CountriesService' in component.services);
            
            // Test 7: Service methods are detected
            if ('CountriesService' in component.services) {
                const methods = component.services.CountriesService;
                test("CountriesService has methods", methods.length > 0);
                test("GetDefault method detected", methods.includes('GetDefault'));
            }
        }

        // Test 8: Custom configuration works
        const customAnalyzer = new AngularAnalyzer({
            targetModule: "tn-api",
            sourcePattern: "sample/**/*.ts"
        });
        test("Custom configuration accepted", customAnalyzer !== undefined);

        console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
            console.log('🎉 All tests passed! The analyzer is working correctly.');
        } else {
            console.log('⚠️  Some tests failed. Please check the implementation.');
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ Test execution failed:', error);
        process.exit(1);
    }
}

runValidationTests();
