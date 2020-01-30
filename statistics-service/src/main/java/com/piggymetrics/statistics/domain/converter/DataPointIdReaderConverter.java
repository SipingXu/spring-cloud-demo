package com.piggymetrics.statistics.domain.converter;

import com.mongodb.DBObject;
import com.piggymetrics.statistics.domain.vo.DataPointId;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataPointIdReaderConverter implements Converter<DBObject, DataPointId> {

    @Override
    public DataPointId convert(DBObject object) {

        Date date = (Date) object.get("date");
        String account = (String) object.get("account");

        return new DataPointId(account, date);
    }
}
