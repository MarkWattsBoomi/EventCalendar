# Event Calendar

This component displays a claendar showing the dary of the selected month and adds events / appointments to days as clickable dots.

The appointments are a list of CalendarEvent objects.

The clicked appointment will be set on the state and a configurable outcome triggered.




## Setup

- Grab the files from the /build folder and import into your tenant.

- Add the files to your player code like this: -

        requires: ['core', 'bootstrap3'],
        customResources: [
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/CalendarEvent.css',
                'https://s3.amazonaws.com/files-manywho-com/tenant-id/CalendarEvent.js',
                ],


- Add a component to your page, any type, save it then change it's "componentType" to "CalendarEvent" in the metadata editor and save it.
e.g. 
            "componentType": "CalendarEvent",
- Create a new type using this JSON via the API: -

'''

{
       "developerName": "CalendarEvent",
       "developerSummary": "",
       "elementType": "TYPE",
       "properties": [
           {
               "contentFormat": "",
               "contentType": "ContentDateTime",
               "developerName": "start"
           },
           {
               "contentFormat": "",
               "contentType": "ContentDateTime",
               "developerName": "end"
           },
           {
               "contentFormat": "",
               "contentType": "ContentString",
               "developerName": "title"
           },
           {
               "contentFormat": "",
               "contentType": "ContentString",
               "developerName": "class"
           },
           {
               "contentFormat": "",
               "contentType": "ContentString",
               "developerName": "tooltip"
           }
       ]
}

'''

- Create a new list of that type and populate its default data with start and end dates, title, tooltip and class (class allows you top specify a css style for the button.
- Set the component's datasource to the new list.
- Set the component's state to an object to receive the selected object
- Set an attribute on the component called "eventTriggeredOutcome" and set it's value to the name of the outcome you want to trigger on click
- Set the outcome's "Appears With" to the new component.


## Extra Configuration


