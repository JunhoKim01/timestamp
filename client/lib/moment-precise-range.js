// ------------------------------------------------
// Edited version of 'zhenya:moment-precise-range'
// Edited : Add Korean locale
//  
//  by https://github.com/JunhoKim01
// ------------------------------------------------


(function(moment) {

    var STRINGS_default = {
        nodiff: '',
        year: 'year',
        years: 'years',
        month: 'month',
        months: 'months',
        day: 'day',
        days: 'days',
        hour: 'hour',
        hours: 'hours',
        minute: 'minute',
        minutes: 'minutes',
        second: 'second',
        seconds: 'seconds',
        delimiter: ' '
    };
    
    var STRINGS_ko = {
      nodiff: '',
      year: '년',
      years: '년',
      month: '개월',
      months: '개월',
      day: '일',
      days: '일',
      hour: '시간',
      hours: '시간',
      minute: '분',
      minutes: '분',
      second: '초',
      seconds: '초',
      delimiter: ' '  
    };


    var strings = {
        default : STRINGS_default,
        ko : STRINGS_ko
    };
    


    moment.fn.preciseDiff = function(d2) {
        return moment.preciseDiff(this, d2);
    };
    moment.preciseDiff = function(d1, d2, locale) {

        // set locale 
        locale = typeof locale !== 'undefined' ?  locale : 'default';

        var m1 = moment(d1), m2 = moment(d2);
        if (m1.isSame(m2)) {
            return strings.default.nodiff;
        }
        if (m1.isAfter(m2)) {
            var tmp = m1;
            m1 = m2;
            m2 = tmp;
        }

        var yDiff = m2.year() - m1.year();
        var mDiff = m2.month() - m1.month();
        var dDiff = m2.date() - m1.date();
        var hourDiff = m2.hour() - m1.hour();
        var minDiff = m2.minute() - m1.minute();
        var secDiff = m2.second() - m1.second();

        if (secDiff < 0) {
            secDiff = 60 + secDiff;
            minDiff--;
        }
        if (minDiff < 0) {
            minDiff = 60 + minDiff;
            hourDiff--;
        }
        if (hourDiff < 0) {
            hourDiff = 24 + hourDiff;
            dDiff--;
        }
        if (dDiff < 0) {
            var daysInLastFullMonth = moment(m2.year() + '-' + (m2.month() + 1), "YYYY-MM").subtract(1, 'M').daysInMonth();
            if (daysInLastFullMonth < m1.date()) { // 31/01 -> 2/03
                dDiff = daysInLastFullMonth + dDiff + (m1.date() - daysInLastFullMonth);
            } else {
                dDiff = daysInLastFullMonth + dDiff;
            }
            mDiff--;
        }
        if (mDiff < 0) {
            mDiff = 12 + mDiff;
            yDiff--;
        }

        function pluralize(num, word) {
            if(locale === 'ko') {
                // Korean - ko
                return num + ' ' + strings.ko[word + (num === 1 ? '' : 's')];
            } else { 
                // default 
                return num + ' ' + strings.default[word + (num === 1 ? '' : 's')];
            }
            
        }
        var result = [];

        if (yDiff) {
            result.push(pluralize(yDiff, 'year'));
        }
        if (mDiff) {
            result.push(pluralize(mDiff, 'month'));
        }
        if (dDiff) {
            result.push(pluralize(dDiff, 'day'));
        }
        if (hourDiff) {
            result.push(pluralize(hourDiff, 'hour'));
        }
        if (minDiff) {
            result.push(pluralize(minDiff, 'minute'));
        }
        if (secDiff && minDiff<1) {
            //result.push(pluralize(secDiff, 'second'));
            // To make 1 minute which is under a minute
            minDiff++;
         	result.push(pluralize(minDiff, 'minute'));   
        }

        if(locale === 'ko') {
            // Korean - ko
            return result.join(strings.ko.delimiter);
        } else { 
            // default 
            return result.join(strings.default.delimiter);
        }

        
    };
}(moment));
