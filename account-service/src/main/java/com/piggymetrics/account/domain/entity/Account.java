package com.piggymetrics.account.domain.entity;

import com.arangodb.springframework.annotation.Document;
import com.piggymetrics.account.domain.vo.Item;
import com.piggymetrics.account.domain.vo.Saving;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Document(collection = "accounts")
@Data
public class Account {

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
