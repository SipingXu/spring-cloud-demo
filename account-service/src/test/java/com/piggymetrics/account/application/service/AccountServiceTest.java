package com.piggymetrics.account.application.service;

import com.piggymetrics.account.application.assembler.AccountAssembler;
import com.piggymetrics.account.application.dto.AccountDTO;
import com.piggymetrics.account.domain.entity.Account;
import com.piggymetrics.account.domain.vo.*;
import com.piggymetrics.account.application.client.AuthServiceClient;
import com.piggymetrics.account.application.client.StatisticsServiceClient;
import com.piggymetrics.account.domain.repository.AccountRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.math.BigDecimal;
import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class AccountServiceTest {

    @InjectMocks
    private AccountServiceImpl accountService;

    @Mock
    private StatisticsServiceClient statisticsClient;

    @Mock
    private AuthServiceClient authClient;

    @Mock
    private AccountRepository repository;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldFindByName() {

        final Account account = new Account();
        account.setName("test");

        when(repository.findByName(account.getName())).thenReturn(account);
        AccountDTO found = accountService.findByName(account.getName());

        assertEquals(AccountAssembler.convertToDTO(account), found);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldFailWhenNameIsEmpty() {
        accountService.findByName("");
    }

    @Test
    public void shouldCreateAccountWithGivenUser() {

        User user = new User();
        user.setUsername("test");

        AccountDTO accountDTO = accountService.create(user);

        assertEquals(user.getUsername(), accountDTO.getName());
        assertEquals(0, accountDTO.getSaving().getAmount().intValue());
        assertEquals(Currency.getDefault(), accountDTO.getSaving().getCurrency());
        assertEquals(0, accountDTO.getSaving().getInterest().intValue());
        assertEquals(false, accountDTO.getSaving().getDeposit());
        assertEquals(false, accountDTO.getSaving().getCapitalization());
        assertNotNull(accountDTO.getLastSeen());

        Account account = AccountAssembler.convertToEntity(accountDTO);

        verify(authClient, times(1)).createUser(user);
        verify(repository, times(1)).save(account);
    }

    @Test
    public void shouldSaveChangesWhenUpdatedAccountGiven() {

        Item grocery = new Item();
        grocery.setTitle("Grocery");
        grocery.setAmount(new BigDecimal(10));
        grocery.setCurrency(Currency.USD);
        grocery.setPeriod(TimePeriod.DAY);
        grocery.setIcon("meal");

        Item salary = new Item();
        salary.setTitle("Salary");
        salary.setAmount(new BigDecimal(9100));
        salary.setCurrency(Currency.USD);
        salary.setPeriod(TimePeriod.MONTH);
        salary.setIcon("wallet");

        Saving saving = new Saving();
        saving.setAmount(new BigDecimal(1500));
        saving.setCurrency(Currency.USD);
        saving.setInterest(new BigDecimal("3.32"));
        saving.setDeposit(true);
        saving.setCapitalization(false);

        final AccountDTO update = new AccountDTO();
        update.setName("test");
        update.setNote("test note");
        update.setIncomes(Collections.singletonList(salary));
        update.setExpenses(Collections.singletonList(grocery));
        update.setSaving(saving);

        final Account account = new Account();

        when(repository.findByName("test")).thenReturn(account);
        accountService.saveChanges("test", update);

        assertEquals(update.getNote(), account.getNote());
        assertNotNull(account.getLastSeen());

        assertEquals(update.getSaving().getAmount(), account.getSaving().getAmount());
        assertEquals(update.getSaving().getCurrency(), account.getSaving().getCurrency());
        assertEquals(update.getSaving().getInterest(), account.getSaving().getInterest());
        assertEquals(update.getSaving().getDeposit(), account.getSaving().getDeposit());
        assertEquals(update.getSaving().getCapitalization(), account.getSaving().getCapitalization());

        assertEquals(update.getExpenses().size(), account.getExpenses().size());
        assertEquals(update.getIncomes().size(), account.getIncomes().size());

        assertEquals(update.getExpenses().get(0).getTitle(), account.getExpenses().get(0).getTitle());
        assertEquals(0, update.getExpenses().get(0).getAmount().compareTo(account.getExpenses().get(0).getAmount()));
        assertEquals(update.getExpenses().get(0).getCurrency(), account.getExpenses().get(0).getCurrency());
        assertEquals(update.getExpenses().get(0).getPeriod(), account.getExpenses().get(0).getPeriod());
        assertEquals(update.getExpenses().get(0).getIcon(), account.getExpenses().get(0).getIcon());

        assertEquals(update.getIncomes().get(0).getTitle(), account.getIncomes().get(0).getTitle());
        assertEquals(0, update.getIncomes().get(0).getAmount().compareTo(account.getIncomes().get(0).getAmount()));
        assertEquals(update.getIncomes().get(0).getCurrency(), account.getIncomes().get(0).getCurrency());
        assertEquals(update.getIncomes().get(0).getPeriod(), account.getIncomes().get(0).getPeriod());
        assertEquals(update.getIncomes().get(0).getIcon(), account.getIncomes().get(0).getIcon());

        verify(repository, times(1)).save(account);
        verify(statisticsClient, times(1)).updateStatistics("test", account);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldFailWhenNoAccountsExistedWithGivenName() {
        final AccountDTO update = new AccountDTO();
        update.setIncomes(Collections.singletonList(new Item()));
        update.setExpenses(Collections.singletonList(new Item()));

        when(accountService.findByName("test")).thenReturn(null);
        accountService.saveChanges("test", update);
    }
}
