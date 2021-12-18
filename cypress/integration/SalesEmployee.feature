Feature: Sales Employee Features

    Testing Login to system

    Scenario Outline: A User attempts to sign-in to the system
        Given The user goes to the login page
        When Entered <EmployeeId> as "fName"
        And Entered <Password> as "lName"
        And Clicked the "login-btn" button
        Then The <Page> should be shown to indicate <Outcome>

        Examples:
            | EmployeeId  | Password    | Page            | Outcome   |
            | "100944655" | "123456789" | "dashboardPage" | "Success" |
            | "100944655" | "998575544" | "dashboardPage" | "Failure" |

    Scenario Outline: A User attempts to view all users in the system
        Given User with <ID> and <Password> is logged in
        When User <Available> click <Button>
        Then User should be on page <url>

        Examples:
            | ID          | Password    | Available    | Button      | url          |
            | "100944655" | "123456789" | "should"     | "viewUsers" | "users/view" |
            | "100944657" | "123456789" | "should not" | "viewUsers" | ""           |


    Scenario Outline: FR-1 A User attempts to view all available stock in the system
        Given User with <ID> and <Password> is logged in
        When User <Available> click <Button>
        Then User should be on page <url>

        Examples:
            | ID          | Password    | Available | Button      | url          |
            | "100944655" | "123456789" | "should"  | "viewStock" | "stock/view" |
            | "100944657" | "123456789" | "should"  | "viewStock" | "stock/view" |

    Scenario Outline: FR-2 A User attempts to request new production order
        Given User with <ID> and <Password> is logged in
        When User <Available> click <Button>
        And User inputs <Date> in "deliverBy"
        And User inputs <Priority> in "priority"
        And User inputs <Invoice> in "invoiced"
        And Clicked the "category-2" button
        And User inputs <Quantity> in "quantity"
        And User inputs <a1> in "attributes-0"
        And User inputs <a2> in "attributes-1"
        And User inputs <a3> in "attributes-2"
        And Clicked the "confirmDetails" button
        And User sees "row-1"
        And Clicked the "submit" button
        Then User views message "Order Has Been Added To The System"

        Examples:
            | ID          | Password    | Available | Button          | Date         | Priority | Invoice  | Quantity | a1  | a2  | a3  |  
            | "100944655" | "123456789" | "should"  | "createRequest" | "2021-12-30" | "High"   | "103394" | "12"     | "1" | "2" | "3" |
            | "100944656" | "123456789" | "should"  | "createRequest" | "2021-12-30" | "High"   | "103394" | "12"     | "1" | "2" | "3" |
            | "100944657" | "123456789" | "should"  | "createRequest" | "2021-12-30" | "High"   | "103394" | "12"     | "1" | "2" | "3" |
            | "100944658" | "123456789" | "should"  | "createRequest" | "2021-12-30" | "High"   | "103394" | "12"     | "1" | "2" | "3" |

    Scenario Outline: FR-3 View Production status
        Given User with <ID> and <Password> is logged in
        When User "should" click "viewOrders"
        Then User sees the first order as "Not Started"

        Examples:
            | ID          | Password    |
            | "100944655" | "123456789" |

    Scenario Outline: FR-4 View Requested Production Orders
        Given User with <ID> and <Password> is logged in
        When User visits page <viewPage> 
        And "requested" "should not" have attribute ".active"
        And Clicked the "requested" button
        Then "requested" "should" have attribute "active"
        
        
        Examples:
            | ID          | Password    | viewPage               |
            | "100944655" | "123456789" | "users/view/100944655" |
            | "100944656" | "123456789" | "users/view/100944656" |
            | "100944657" | "123456789" | "users/view/100944657" |

    Scenario Outline: FR-6 View Own Account
        Given User with <ID> and <Password> is logged in
        When User visits page <viewPage> 
        Then User views message <Message>

        Examples:
            | ID          | Password    | viewPage               | Message |
            | "100944655" | "123456789" | "users/view/100944655" | "Employee # 100944655's Page" |
            | "100944656" | "123456789" | "users/view/100944656" | "Employee # 100944656's Page" |
            | "100944657" | "123456789" | "users/view/100944657" | "Employee # 100944657's Page" |
            | "100944658" | "123456789" | "users/view/100944658" | "Employee # 100944658's Page" |
            | "100944659" | "123456789" | "users/view/100944659" | "Employee # 100944659's Page" |

    Scenario Outline: FR-7 View Suppliers
        Given User with <ID> and <Password> is logged in
        When User visits page <viewPage> 
        Then User views message "View all suppleirs registered in the system"

        Examples:
            | ID          | Password    | viewPage         |
            | "100944655" | "123456789" | "supplier/view"  |
            | "100944656" | "123456789" | "supplier/view"  |
            | "100944657" | "123456789" | "supplier/view"  |
            | "100944658" | "123456789" | "supplier/view"  |
            | "100944659" | "123456789" | "supplier/view"  |

    Scenario Outline: FR-8 View Suppliers Info
        Given User with <ID> and <Password> is logged in
        When User visits page <viewPage> 
        Then User views message "Supplier T.M.I. Details"
        And User views message "Supplier Information"

        Examples:
            | ID          | Password    | viewPage                |
            | "100944655" | "123456789" | "supplier/view/T.M.I."  |
            | "100944656" | "123456789" | "supplier/view/T.M.I."  |
            | "100944657" | "123456789" | "supplier/view/T.M.I."  |
            | "100944658" | "123456789" | "supplier/view/T.M.I."  |
            | "100944659" | "123456789" | "supplier/view/T.M.I."  |
