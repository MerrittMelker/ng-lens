// Test runner to validate all analyzer functionality
import { AngularAnalyzer } from './AngularAnalyzer.js';
import { Project } from 'ts-morph';
import { RoutingAnalyzer } from './analyzers/RoutingAnalyzer.js';

async function runValidationTests() {
    console.log('🪪 Running NgLens Validation Tests...\n');
    
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
        const analyzer = new AngularAnalyzer({
            targetModule: "your-api-module",
            sourcePattern: "sample/**/*.ts"
        });
        test("AngularAnalyzer instantiation", analyzer !== undefined);

        // Test 2: Analyze sample files (using generic API module)
        const results = await analyzer.analyze();
        test("Analysis completes without errors", results !== undefined);

        // Test 3: Check that results contain expected component
        const hasProductEditComponent = 'ProductEditComponent' in results;
        test("Finds ProductEditComponent", hasProductEditComponent);

        if (hasProductEditComponent) {
            const component = results.ProductEditComponent;
            
            // Test 4: Component has file path
            test("Component has file path", component.file !== undefined);
            
            // Test 5: Component has services
            test("Component has services", Object.keys(component.services).length > 0);
            
            // Test 6: Service detection works (check for any service)
            const serviceNames = Object.keys(component.services);
            test("At least one service detected", serviceNames.length > 0);
            
            // Test 7: Service methods are detected
            if (serviceNames.length > 0) {
                const firstService = serviceNames[0];
                const methods = component.services[firstService];
                test(`${firstService} has methods`, methods.length > 0);
                test("Methods are properly formatted", Array.isArray(methods));
            }
        }

        // Test 8: Custom configuration works
        const customAnalyzer = new AngularAnalyzer({
            targetModule: "my-custom-api",
            sourcePattern: "sample/**/*.ts"
        });
        test("Custom configuration accepted", customAnalyzer !== undefined);

        // Routing Analyzer tests
        const project = new Project();
        const sourceFile = project.addSourceFileAtPath('sample/crm-routing.module.ts');
        const routingAnalyzer = new RoutingAnalyzer();
        const routeEntries = routingAnalyzer.analyzeFile(sourceFile);

        test("RoutingAnalyzer finds entries", routeEntries.length > 0);

        const searchRoute = routeEntries.find(r => r.component === 'ConstituentSearchComponent');
        test("Finds ConstituentSearch route", !!searchRoute);
        if (searchRoute) {
            test("ConstituentSearch has menuId", searchRoute.menuId.includes('MenuEntries.ConstituentSearch'));
            test("ConstituentSearch full path is 'search'", searchRoute.fullPath === 'search');
            test("ConstituentSearch import path captured", !!searchRoute.importPath && searchRoute.importPath.includes('./constituent-search/constituent-search.component'));
        }

        const addressesRoute = routeEntries.find(r => r.component === 'AddressesComponent');
        test("Finds Addresses route", !!addressesRoute);
        if (addressesRoute) {
            test("Addresses has menuId", addressesRoute.menuId.includes('MenuEntries.Addresses'));
            test("Addresses full path includes constituentId", addressesRoute.fullPath === 'constituents/:constituentId/addresses');
            test("Addresses import path captured", !!addressesRoute.importPath && addressesRoute.importPath.includes('./constituent-detail/addresses/addresses.component'));
        }

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
