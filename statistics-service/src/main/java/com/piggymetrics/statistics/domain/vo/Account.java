package com.piggymetrics.statistics.domain.vo;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Document(collection = "accounts")
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Account {
    @Valid
    @NotNull
    private List<Item> incomes;

    @Valid
    @NotNull
    private List<Item> expenses;

    @Valid
    @NotNull
    private Saving saving;
}
