package com.piggymetrics.notification.domain.converter;

import com.arangodb.velocypack.VPackSlice;
import com.piggymetrics.notification.domain.vo.Frequency;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class FrequencyReaderConverter implements Converter<VPackSlice, Frequency> {

    @Override
    public Frequency convert(VPackSlice slice) {
        return Frequency.withDays((int)(slice.getAsLong() / 24 / 3600 / 1000));
    }
}
