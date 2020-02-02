package com.piggymetrics.statistics.domain.vo;

import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@AllArgsConstructor
@ToString
public class DataPointId {
    @Getter
    private String account;
    @Getter
    private Date date;
}
