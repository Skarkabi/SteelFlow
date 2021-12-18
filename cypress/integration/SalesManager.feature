Feature: Sales Manager Features

    Scenario Outline: FR-9 Approve Pending Sales Order
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
        And User views message "Order Has Been Added To The System"
        And User visits page "logout"
        And User with <ID2> and <Password2> is logged in
        And User visits page "orders/view/approval"
        And Order "status-0" Status should be "Pending Sales Approval"
        And Clicked the "status-0" button
        And Order status should be "Pending Sales Approval"
        And Clicked the "approve" button
        Then Order status should be "Pending Production Approval"
    
        Examples:
            | ID          | Password    | Available | Button          | Date         | Priority | Invoice  | Quantity | a1  | a2  | a3  | ID2          | Password2    |
            | "100944655" | "123456789" | "should"  | "createRequest" | "2021-12-30" | "High"   | "103394" | "12"     | "1" | "2" | "3" | "100944656" | "123456789" |



    Scenario Outline: FR-11 View Sales Employee Staff
        Given User with <ID> and <Password> is logged in
        When User visits page <viewPage> 
        And Clicked the "staff" button
        Then User views "staff" table
    
        Examples:
            | ID          | Password    | viewPage                |
            | "100944655" | "123456789" | "users/view/100944656"  |

    Scenario Outline: FR-12 View Sales Employee Staff Account Page
        Given User with <ID> and <Password> is logged in
        When User visits page <viewPage> 
        And Clicked the "staff" button
        And User views "staff" table
        And Clicked the "row-100944657" button
        Then User views message "Employee # 100944657's Page"
        And User should be on page "users/view/100944657"
    
        Examples:
            | ID          | Password    | viewPage                |
            | "100944655" | "123456789" | "users/view/100944656"  |