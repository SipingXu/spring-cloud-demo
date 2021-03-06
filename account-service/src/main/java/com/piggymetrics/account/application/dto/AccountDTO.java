package com.piggymetrics.account.application.dto;

import com.piggymetrics.account.domain.vo.Item;
import com.piggymetrics.account.domain.vo.Saving;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class AccountDTO {
    @Id
    private String name;

    private Date lastSeen;

    @Valid
    private List<Item> incomes;

    @Valid
    private List<Item> expenses;

    @Valid
    @NotNull
    private Saving saving;

    @Length(min = 0, max = 20_000)
    private String note;
}
