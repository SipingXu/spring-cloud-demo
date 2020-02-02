package com.piggymetrics.notification.domain.converter;

import com.arangodb.velocypack.VPackBuilder;
import com.arangodb.velocypack.VPackSlice;
import com.piggymetrics.notification.domain.vo.Frequency;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class FrequencyWriterConverter implements Converter<Frequency, VPackSlice> {

    @Override
    public VPackSlice convert(Frequency frequency) {
        VPackBuilder builder = new VPackBuilder();
        builder.add(frequency.getDays() * 24 * 3600 * 1000L);
        return builder.slice();
    }
}
