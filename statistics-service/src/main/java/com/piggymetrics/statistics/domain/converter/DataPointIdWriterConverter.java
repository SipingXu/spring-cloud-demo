package com.piggymetrics.statistics.domain.converter;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.piggymetrics.statistics.domain.vo.DataPointId;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class DataPointIdWriterConverter implements Converter<DataPointId, DBObject> {

    private static final int FIELDS = 2;

    @Override
    public DBObject convert(DataPointId id) {

        DBObject object = new BasicDBObject(FIELDS);

        object.put("date", id.getDate());
        object.put("account", id.getAccount());

        return object;
    }
}
