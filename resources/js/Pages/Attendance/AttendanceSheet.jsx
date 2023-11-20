import SelectComponent from '@/Components/SelectComponent';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

export default function AttendanceSheet({ auth }) {

    const [monthsArray, setMonthsArray] = useState([]);

    const [monthOption, setMonthOption] =  useState({});

    const [monthDetails, setMonthDetails] =  useState([])

    useEffect(() => {
        const getFullMonthsInYear = () => {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const months = [];
          const dateFormatOptions = { month: 'long' };
    
          for (let month = 0; month <= currentMonth; month++) {
            const date = new Date(currentDate.getFullYear(), month, 1);
            const monthName = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date);
            months.push({ value: monthName.toLowerCase(), label: monthName });
          }
    
          return months;
        };
    
        const fullMonths = getFullMonthsInYear();
        setMonthsArray(fullMonths);
      }, []);

      const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
      };

      const handleDropDownOptionChange = useCallback((option) => {
        const selectedMonth = option.value; // Get the selected month value
        const currentDate = new Date(); // Get current date
        const selectedYear = currentDate.getFullYear(); // Get current year
        const selectedMonthIndex = monthsArray.findIndex((m) => m.value === selectedMonth);
    
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonthIndex);
        const datesArray = [];
    
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(selectedYear, selectedMonthIndex, day);
          const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
          datesArray.push({ date: formattedDate, day: dayOfWeek });
        }
    
        console.log(datesArray); // Display the array in the console
        setMonthDetails(datesArray);
      }, [monthsArray]);
    

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-4 mt-5'>
          <SelectComponent
            options={monthsArray}
            placeholder='select month'
            className= 'w-2/4'
            onChange={handleDropDownOptionChange}
          />
        </div>
      </div>
      <div className='mt-5'>
        <Table columns={['Date','Day','Productivity','Hours Spent','Action']} data={monthDetails}/>
      </div>
    </div>
           

           
        </AuthenticatedLayout>
    )
};
