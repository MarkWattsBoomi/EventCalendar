import * as React from 'react';
import './css/EventCalendar.css';
import { FlowComponent } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowComponent';
import { FlowObjectData } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/FlowObjectData';
import { IManywho } from '/Operational Data/Flow UI Custom Components/2019 Version/FlowComponentModel/src/interfaces';

declare const manywho: IManywho;

class EventCalendar extends FlowComponent {

    months: any = {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' };

    events: {[key: string]: any} = {};

    monthToView: Date = new Date();

    constructor(props: any) {
        super(props);

        this.previousMonth = this.previousMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.getDaysForMonth = this.getDaysForMonth.bind(this);

    }

    async componentDidMount() {
        this.buildEvents();
    }

    async eventClicked(event: any) {
        console.log(event);
        await this.setStateValue(event);
        await this.triggerOutcome(this.getAttribute('eventTriggeredOutcome'), [event]);
    }

    buildEvents() {
        const events: FlowObjectData[] = this.model.dataSource.items;
        if (events && events.length > 0) {
            events.forEach((event: FlowObjectData) => {
                const eventDate: Date = new Date(event.properties['start'].value as string);
                this.events[eventDate.toDateString()] = event;
            });
        }
    }

    getDaysForMonth(monthToView: Date): any[] {
        const weeks: any[] = [];
        const month: number = monthToView.getMonth();

        const startDate: Date = new Date(monthToView.getTime());
        startDate.setDate(1);
        // roll back to first sunday
        while (startDate.getDay() !== 0) {
            startDate.setDate(startDate.getDate() - 1);
        }

        const endDate: Date = new Date(monthToView.getTime());
        // roll forward to last day
        while (endDate.getMonth() === month) {
            endDate.setDate(endDate.getDate() + 1);
        }

        while (endDate.getDay() !== 0) {
            endDate.setDate(endDate.getDate() + 1);
        }

        console.log('Range = ' + startDate.toDateString() + ' - ' + endDate.toDateString());
        // loop over days

        let week: number = 0;
        const day: number = 0;
        while (startDate.getTime() < endDate.getTime()) {
            if (!weeks[week]) {
                weeks[week] = [];
            }
            weeks[week][startDate.getDay()] = new Date(startDate.getTime());
            if (startDate.getDay() >= 6) {
                week += 1;
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        return weeks;
    }

    render() {

        const wks: Date[][] = this.getDaysForMonth(this.monthToView);

        const weeks: any[] = [];

        wks.forEach((week: Date[]) => {
            const days: any[] = [];
            week.forEach((day: Date) => {
                let className: string = '';
                let content: any;
                if (day.getMonth() !== this.monthToView.getMonth()) {
                    className += ' day-disabled';
                    content = <span className={className}>{day.getDate().toString()}</span>;
                } else {
                    // is it an event day
                    if (this.events && this.events[day.toDateString()]) {

                        className += ' day-event';
                        if (this.events[day.toDateString()].properties['class'].value) {
                            className += ' ' + this.events[day.toDateString()].properties['class'].value;
                        }
                        content =   (
                        <span
                            className={className}
                            title={this.events[day.toDateString()].properties['tooltip'].value}
                            onClick={(e: any) => {this.eventClicked(this.events[day.toDateString()]); }}
                        >
                            {day.getDate().toString()}
                        </span>);
                    } else {
                        content = <span>{day.getDate().toString()}</span>;
                    }
                }

                days.push(
                    <td
                        className="day"
                    >
                        {content}
                    </td>,
                    );
            });
            weeks.push(
                <tr className="week">
                    {days}
                </tr>,
            );
        });

        return (
        <div
            className="event-calendar"
        >
            <div

                className="ec-title-bar"
            >
                <div
                    className="ec-title-bar-button-container-left"
                >
                    <span
                        className="glyphicon glyphicon-triangle-left ec-month-nav-button"
                        title="Previous Month"
                        onClick={(e: any) => {this.previousMonth(e); }}
                    />
                </div>
                <div
                    className="ec-title-bar-title-container"
                >
                    <span
                        className="ec-month-nav-title"
                    >
                        {this.months[this.monthToView.getMonth()] + ' ' + this.monthToView.getFullYear()}
                    </span>
                </div>
                <div
                    className="ec-title-bar-button-container-right"
                >
                    <span
                        className="glyphicon glyphicon-triangle-right ec-month-nav-button"
                        title="Next Month"
                        onClick={(e: any) => {this.nextMonth(e); }}
                    />
                </div>
            </div>
            <div

                className="ec-body"
            >
                <div
                    className="ec-body-client"
                >
                    <table
                        className="ec-table"
                    >
                        <thead>
                            <tr
                                className="ec-table-header"
                            >
                                <th className="ec-table-th">Su</th>
                                <th className="ec-table-th">Mo</th>
                                <th className="ec-table-th">Tu</th>
                                <th className="ec-table-th">We</th>
                                <th className="ec-table-th">Th</th>
                                <th className="ec-table-th">Fr</th>
                                <th className="ec-table-th">Sa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeks}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
        );
    }

    previousMonth(e: any) {
        this.monthToView.setMonth(this.monthToView.getMonth() - 1);
        this.forceUpdate();
    }

    nextMonth(e: any) {
        this.monthToView.setMonth(this.monthToView.getMonth() + 1);
        this.forceUpdate();
    }
}

manywho.component.register('EventCalendar', EventCalendar);

export default EventCalendar;
