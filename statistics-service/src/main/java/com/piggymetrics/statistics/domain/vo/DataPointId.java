package com.piggymetrics.statistics.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

@ToString
@AllArgsConstructor
public class DataPointId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Getter
    private String account;
    @Getter
    private Date date;
}
