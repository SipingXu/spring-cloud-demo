package com.piggymetrics.statistics.domain.repository;

import com.piggymetrics.statistics.domain.entity.DataPoint;
import com.piggymetrics.statistics.domain.vo.DataPointId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DataPointRepository extends CrudRepository<DataPoint, DataPointId> {

    List<DataPoint> findByIdAccount(String account);

}
